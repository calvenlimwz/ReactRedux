import React from 'react';
import { FormGroup, Label, Input} from 'reactstrap';

export default ({ input , label, desc , type, meta: {error, touched} }) => {
  return (
    <FormGroup>
      <Label>{label}</Label>
      <Input {...input} style={{ marginBottom:'5px' }} placeholder={desc} type={type}/>
      <p className="text-danger">
        {touched && error}
      </p>
    </FormGroup>
  );
};
