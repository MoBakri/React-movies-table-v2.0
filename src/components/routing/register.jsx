import React from "react";
import MainForm from "./../common/mainForm";
import Joi from "joi-browser";
import { users } from "../services/usersService";
import { setJwt } from "../services/authService";

class register extends MainForm {
  state = { data: { username: "", password: "", email: "" }, errors: {} };

  schema = {
    email: Joi.string().email().label("Email").required(),
    username: Joi.string().label("Username").required(),
    password: Joi.string().label("Password").required(),
  };
  async onSubmitted() {
    const { data } = this.state;

    // send to server
    try {
      const response = await users(data);
      setJwt(response.headers["x-auth-token"]);
      window.location = "/";
    } catch (err) {
      const errors = { ...this.state.errors };
      if (err.response && err.response.status === 400) {
        errors.email = err.response.data;
        this.setState({ errors });
      }
    }
  }

  render() {
    return (
      <form onSubmit={this.submitted} className="container">
        <h3>register</h3>
        {this.input("username", "Username")}
        {this.input("email", "Email", "email")}
        {this.input("password", "Password", "password")}

        {this.submitBtn("register")}
      </form>
    );
  }
}

export default register;
