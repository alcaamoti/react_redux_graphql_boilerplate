import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {defaultAction} from '../actions';


const renderField = ({placeholder, input, label, type, meta: {touched, error}})=>{
    return (
        <input
            label = {label}
            type = {type}
            placeholder = {placeholder}
            {...input}
        />
    )
}

class Messager extends React.Component{

    onSubmit({message}){
        this.props.defaultAction(message);
    }

    render(){
        
        const {handleSubmit} = this.props;

        return (
            <form>
                <Field
                    name = 'message'
                    label = 'Message'
                    placeholder = 'Enter a message'
                    type = 'text'
                    component = {renderField}
                />
                <button type = 'submit' onClick = {handleSubmit(this.onSubmit.bind(this))}>Enter</button>
            </form>
        )
        
    }
}


const validate = (values)=>{
    const errors = {};
    return errors;
}

export default reduxForm({
    validate,
    form: 'DefaultForm'
})(connect(null, {defaultAction})(Messager));