import './App.css';
import {connect} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css'
import Column from './components/Column';
import ModalWindow from './components/ModalWindow';

function App(props) {
    return (
        <div className="App">
            <h1>{props.appName}</h1>

            <ModalWindow buttonLabel='Create Task' buttonStyle='btn btn-outline-info' modalTitle="Create"/>

            <div className="container text-center">
                <div className="row align-items-start">
                    {props.statuses.map(status => <Column
                            key={status._id}
                            status={status}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    appName: state.appName,
    statuses: state.statuses,
})

export default connect(mapStateToProps)(App);
