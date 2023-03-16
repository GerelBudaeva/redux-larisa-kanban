import React, {useState} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {connect} from 'react-redux';

function ModalWindow(props) {
    const [modal, setModal] = useState(false);

    const [name, setName] = useState(
        props.modalTitle === 'Create' ? '' : props.task.name);
    const [description, setDescription] = useState(
        props.modalTitle === 'Create' ? '' : props.task.description);
    const [status, setStatus] = useState(
        props.modalTitle === 'Create' ? props.statuses[0].title : props.task.status);
    const [priority, setPriority] = useState(
        props.modalTitle === 'Create' ? props.priorities[0] : props.task.priority)

    const toggle = () => setModal(!modal);

    const onSaveButtonHandler = () => {

        if (props.modalTitle === 'Create') {
            const newTask = {_id: Math.random().toString(), name, description, status, priority}
            props.createTask(newTask)
        }
        if (props.modalTitle === 'Edit task') {
            const updateTask = {name, description, status, priority}
            props.editTask(props.task._id, updateTask)
        }
        if (props.modalTitle === 'Delete') {
            props.deleteTask(props.task._id)
        }
        toggle()
    }

    return (
        <>
            <Button color={props.buttonStyle} onClick={toggle}>
                {props.buttonLabel}
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>{props.modalTitle}</ModalHeader>
                <ModalBody>

                    <div className="input-group flex-nowrap">
                        <input type="text"
                               className="form-control"
                               placeholder="Name"
                               aria-label="Username"
                               aria-describedby="addon-wrapping"
                               value={name}
                               onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <br/>

                    <div className="input-group flex-nowrap">
                        <input type="text"
                               className="form-control"
                               placeholder="Description"
                               aria-describedby="addon-wrapping"
                               value={description}
                               onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <br/>

                    <select className="form-select"
                            aria-label="Default select example"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                    >
                        {props.statuses.map(el => <option key={el._id} value={el.title}>{el.title}</option>)}
                    </select>
                    <br/>

                    <select className="form-select"
                            aria-label="Default select example"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                    >
                        {props.priorities.map((el, ind) => <option key={ind} value={el}>{el}</option>)}
                    </select>

                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={onSaveButtonHandler}>
                        {props.modalTitle === 'Delete' ? 'Delete' : 'Save'}
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
}

const mapStateToProps = (state) => ({
    statuses: state.statuses,
    priorities: state.priorities
})

const mapDispatchToProps = (dispatch) => ({
    createTask: (newTask) => dispatch({type: 'CREATE_TASK', payload: newTask}),
    editTask: (id, updateTask) => dispatch({type: 'UPDATE_TASK', payload: {id, updateTask}}),
    deleteTask: (id) => dispatch({type: 'DELETE', payload: id})

})

export default connect(mapStateToProps, mapDispatchToProps)(ModalWindow);
