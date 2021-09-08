import React from "react";
import MainForm from "./../common/mainForm";
import Joi from "joi-browser";
import auth from "../services/authService";

class Login extends MainForm {
  state = { data: { username: "", password: "" }, errors: {} };

  schema = {
    username: Joi.string().label("Username").required(),
    password: Joi.string().label("Password").required(),
  };
  async onSubmitted() {
    // send to server
    const { data, errors } = this.state;
    try {
      const { data: jwt } = await auth.login(data.username, data.password);
      auth.setJwt(jwt);
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (err) {
      if (err.response && err.response.status === 400) {
        errors.username = err.response.data;
        this.setState({ errors });
      }
    }
  }

  render() {
    if (auth.getCurrentUser()) return (window.location = "/");
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
