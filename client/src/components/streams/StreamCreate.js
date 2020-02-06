import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createStream } from '../../actions';

// Field is a react component - not responsible to render an input element on the screen
// Pass in a component - so that it will be able to render the component
// reduxForm is a function : exact same functionality as the connect() function from react-redux
class StreamCreate extends Component {
    renderInput = ({ input, label, meta }) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`;

        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off" />
                {this.renderError(meta)}
            </div>
        );
    }

    renderError = ({ error, touched }) => {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
    }

    // On every change, redux form will try to call a function validate.
    onSubmit = (formValues) => {
        this.props.createStream(formValues);
    }

    // redux-form will compare the field name with the error object
    // if the error object properties name is the same as field name then the error message will be passed into the 
    // renderInput function
    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                <Field name="title" component={this.renderInput} label="Enter Title" />
                <Field name="description" component={this.renderInput} label="Enter Description" />
                <button className="ui button primary">Submit</button>
            </form>
        );
    }
}


// All valid values then return an empty object
// if there is an issue - then return an object
// for each invalid field with a key-value pair
// errors = { title: 'You must do something' }
const validate = (formValues) => {
    const errors = {};
    if (!formValues.title) {
        errors.title = 'you must enter a title';
    }
    if (!formValues.description) {
        errors.description = 'you must enter a descriptions';
    }
    return errors;
};

// Add a couple of props to managed the redux-store <--> component <--> form
const formWrapped = reduxForm({
    form: 'streamCreate',
    validate
})(StreamCreate);

export default connect(null, { createStream })(formWrapped);