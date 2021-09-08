import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "./navbar";
import Movies from "./components/movies";
import Login from "./components/routing/login";
import NewTable from "./components/newTable";
import NotFound from "./components/routing/not-found";
import register from "./components/routing/register";
import Logout from "./components/routing/logout";
import auth from "./components/services/authService";
import ProtectRoute from "./components/routing/protectRoute";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = {};
  componentDidMount() {
    const data = auth.getCurrentUser();
    this.setState({ data });
  }
  render() {
    const { data } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={data} />
        <Switch>
          <Route path="/register" component={register} />
          <Route path="/logout" component={Logout} />
          <Route path="/login" component={Login} />
          <ProtectRoute path="/movies/:id" component={NewTable} />
          <Route
            path="/movies"
            render={(props) => <Movies user={data} {...props} />}
          />
          <Redirect path="/" exact to="/movies" />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </React.Fragment>
    );
  }
}
export default App;
