import React from 'react';
import {connect} from 'react-redux';
import Messager from '../containers/default';

class App extends React.Component{

    render(){
        return (
            <div>
                <h1>React Redux GraphQL App</h1>
                <Messager />
                {this.props.message ? <p>{this.props.message}</p>:<p/> }
            </div>

        );
    }
}

const mapStateToProps = ({reducers})=>{
    return {message: reducers.appMessage}
}

export default connect(mapStateToProps)(App);