import React from 'react';
import {connect} from 'react-redux';
import ModalWindow from './ModalWindow';

const Tasks = (props) => {
    return (
        <div className="card mb-3">
            <div className="card-header">
                {props.task.status}
            </div>
            <div className="card-body">
                <h4 className="card-title">{props.task.name}</h4>
                <h5 className="card-text">{props.task.description}</h5>
                <p className="card-text">
                    <button className="btn btn-outline-primary"
                            onClick={() => props.changePriority(props.task._id, -1)}
                            disabled={props.task.priority === props.priorities[0]}>
                        ↓
                    </button>

                    Priority: {props.task.priority}

                    <button className="btn btn-outline-primary"
                            onClick={() => props.changePriority(props.task._id, 1)}
                            disabled={props.task.priority === props.priorities[props.priorities.length - 1]}>
                        ↑
                    </button>
                </p>
                <hr/>
                <>
                    <button className="btn btn-outline-info"
                            onClick={() => props.changedTask(props.task._id, props.task.status, -1)}
                            disabled={props.task.status === props.newStringStatuses[0]}
                    > ←
                    </button>
                    {' '}

                    <ModalWindow buttonLabel="Delete"
                                 buttonStyle="btn btn-outline-danger"
                                 modalTitle='Delete'
                                 task={props.task}
                    />
                    {' '}
                    <ModalWindow buttonLabel="Edit"
                                 buttonStyle="btn btn-outline-success"
                                 modalTitle='Edit task'
                                 task={props.task}
                    />
                    {' '}
                    <button className="btn btn-outline-info"
                            onClick={() => props.changedTask(props.task._id, props.task.status, 1)}
                            disabled={props.task.status === props.newStringStatuses[props.newStringStatuses.length - 1]}
                    > →
                    </button>
                </>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    priorities: state.priorities,
    newStringStatuses: state.statuses.map(el => el.title),
})

const mapDispatchToProps = (dispatch) => ({
    changePriority: (id, direction) => dispatch({type: 'CHANGE_PRIORITY', payload: {id, direction}}),
    changedTask: (id, currentStatus, direction) => dispatch({
        type: 'CHANGE_STATUSES',
        payload: {id, currentStatus, direction}
    }),
    deletedTasks: (id) => dispatch ({type: 'DELETE', payload: id})
})


export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
