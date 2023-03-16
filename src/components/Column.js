import React from 'react';
import {connect} from 'react-redux';
import Tasks from './Tasks';

const Column = (props) => {
    return (

        <div className="col">
            <h2>{props.status.title.toUpperCase()}</h2>
            {props.tasks.filter(el => props.status.title === el.status).map(task => <Tasks
                    key={task._id}
                    task={task}
                />
            )}
        </div>

    );
};

const mapStateToProps = (state) => ({
    tasks: state.tasks
})

export default connect(mapStateToProps)(Column);
