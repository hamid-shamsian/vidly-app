import { Component } from "react";
import Input from "./Input";
import Select from "./Select";
import Joi from "joi-browser";

class Form extends Component {
   // in the inheriting component of this component:
   // state must include these property names exactly: data,errors
   // and the doSubmit() method must be declared for desired logic after
   // validation and submission.

   // state = { data: {}, errors: {} };

   validate = () => {
      //const options = { abortEarly: false }; //  (by default its true)
      const { error } = Joi.validate(this.state.data, this.schema); //, options);
      return error;

      // if (!error) return null;
      // const errors = {};
      // for (let item of error.details) errors[item.path[0]] = item.message;
      // return errors;
   };

   validateInput = ({ name, value }) => {
      const obj = { [name]: value };
      const schema = { [name]: this.schema[name] };
      const { error } = Joi.validate(obj, schema);
      return error && error.details[0].message;
   };

   handleSubmit = e => {
      e.preventDefault();

      // const errors = this.validate();
      // this.setState({ errors: errors || {} });
      // if (errors) return;

      this.doSubmit();
   };

   handleChange = ({ target: input }) => {
      const data = { ...this.state.data };
      data[input.name] = input.value;

      const errors = { ...this.state.errors };
      const error = this.validateInput(input);
      if (error) errors[input.name] = error;
      else delete errors[input.name];

      this.setState({ data, errors });
   };

   renderInput = (name, label, type = "text") => {
      const { data, errors } = this.state;
      return (
         <Input
            type={type}
            name={name}
            label={label}
            value={data[name]}
            error={errors[name]}
            onChange={this.handleChange}
         />
      );
   };

   renderSelect = (name, label, options) => {
      const { data, errors } = this.state;
      return (
         <Select
            name={name}
            label={label}
            options={options}
            value={data[name]}
            error={errors[name]}
            onChange={this.handleChange}
         />
      );
   };

   renderButton = label => {
      return (
         <button disabled={this.validate()} className='btn btn-primary'>
            {label}
         </button>
      );
   };
}

export default Form;
