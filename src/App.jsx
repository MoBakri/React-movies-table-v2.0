import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Movies from "./components/movies";
import NavBar from "./navbar";
import Login from "./components/routing/login";
import NewTable from "./components/newTable";
import NotFound from "./components/routing/not-found";
const App = () => {
  return (
    <React.Fragment>
      <NavBar />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/movies/:id" component={NewTable} />
        <Route path="/movies" component={Movies} />
        <Route path="/" exact component={Movies} />
        <Route path="/not-found" component={NotFound} />
        <Redirect to="/not-found" />
      </Switch>
    </React.Fragment>
  );
};

export default App;
