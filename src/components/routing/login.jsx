import React from "react";
import MainForm from "./../common/mainForm";
import Joi from "joi-browser";

class Login extends MainForm {
  state = { data: { username: "", password: "" }, errors: {} };

  schema = {
    username: Joi.string().alphanum().label("Username").required(),
    password: Joi.string().label("Password").required(),
  };
  onSubmitted() {
    // send to server
    console.log("submitted");
  }

  render() {
    return (
      <form onSubmit={this.submitted} className="container">
        <h3>Login</h3>
        {this.input("username", "Username")}
        {this.input("password", "Password", "password")}

        {this.submitBtn("Login")}
      </form>
    );
  }
}

export default Login;
