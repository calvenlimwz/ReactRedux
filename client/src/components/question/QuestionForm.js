//QuestionForm shows a form for a user to add input
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import QuestionField from './QuestionField';
import { Button, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import validateTags from '../../utils/validateTags';
import formFields from './formFields';

class QuestionForm extends Component {
  renderFields(){
    return _.map(formFields, ({ label, desc, type, name}) =>{
      return (
        <Field
        key={name}
        component={QuestionField}
        label={label}
        name={name}
        type={type}
        desc={desc}
        />
      );
    });
  }
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onQuestionSubmit)}>
         <ModalHeader>Add Question</ModalHeader>
         <ModalBody>
          {this.renderFields()}
          </ModalBody>
          <ModalFooter>
          <Link to="/questions"><Button color="primary">Cancel</Button>{' '}</Link>
          <Button type="submit" color="success">Next</Button>{' '}
          </ModalFooter>
        </form>
      </div>
    );
  }
}

function validate(values){
  const errors = {};

  errors.tags = validateTags(values.tags || '');

  _.each(formFields, ({ name, noValueError }) => {
    if (!values[name] && name !== 'tags') {
      errors[name] = noValueError;
    }
  });

  return errors;
}

export default reduxForm({
  validate,
  form: 'questionForm',
  destroyOnUnmount: false
})(QuestionForm);
