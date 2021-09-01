import React, { Component } from "react";
import InputField from "./../routing/inputField";
import SelectOptionField from "./../routing/selectField";
import Joi from "joi-browser";
class MainForm extends Component {
  state = { data: {}, errors: {} };

  validate() {
    const result = Joi.validate(this.state.data, this.schema, {
      abortEarly: false,
    });
    const errors = {};
    if (!result.error) return null;
    for (const item of result.error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  }

  submitted = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    this.onSubmitted();
  };

  validateProperty({ name, value }) {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  }

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  input(name, label, type = "text") {
    const { data, errors } = this.state;
    return (
      <InputField
        name={name}
        label={label}
        type={type}
        data={data}
        handleChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
  selectOption(name, label, option) {
    const { data, errors } = this.state;
    return (
      <SelectOptionField
        name={name}
        label={label}
        data={data}
        option={option}
        handleChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
  submitBtn(label) {
    return (
      <button className="btn btn-primary" disabled={this.validate()}>
        {label}
      </button>
    );
  }
}

export default MainForm;
