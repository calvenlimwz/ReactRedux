//QuestionFormReview shows users their form inputs for review
import _ from 'lodash';
import React from 'react';
import { Button, ModalHeader, ModalBody, ModalFooter, FormGroup, Label } from 'reactstrap';
import { connect } from 'react-redux';
import formFields from './formFields';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';

const QuestionFormReview = ({ onCancel, formValues, submitQuestion, history }) => {
  const reviewFields = _.map(formFields, ({ name, label }) => {
    return (
      <div key ={name}>
        <Label>{label}</Label>
        <p className="text-muted">{formValues[name]}</p>
      </div>
    );
  });

  return (
    <div>
      <ModalHeader>Please Confirm Your Entries</ModalHeader>
      <ModalBody>
      <FormGroup>
        {reviewFields}
      </FormGroup>
      </ModalBody>
      <ModalFooter>
      <Button color="primary" onClick={onCancel}>Back</Button>{' '}
      <Button type="submit" color="success" onClick={() => submitQuestion(formValues, history)}>Confirm</Button>{' '}
      </ModalFooter>
    </div>
  );
}

function mapStateToProps(state){
  return { formValues: state.form.questionForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(QuestionFormReview));
