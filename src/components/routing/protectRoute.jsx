import { render } from "@testing-library/react";
import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../services/authService";
const ProtectRoute = ({ data, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!auth.getCurrentUser())
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};
export default ProtectRoute;
