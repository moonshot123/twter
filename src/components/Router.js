import React, { useState } from "react";
import { Route, Switch, HashRouter as Router } from "react-router-dom";
import Auth from "../routers/Auth";
import Home from "../routers/Home";

const RouterComponent = ({ isLogin }) => {
  return (
    <>
      <Router>
        <Switch>
          {isLogin ? (
            <>
              <Route exact path="/">
                <Home />
              </Route>
            </>
          ) : (
            <>
              <Route exact path="/">
                <Auth />
              </Route>
            </>
          )}
        </Switch>
      </Router>
    </>
  );
};

export default RouterComponent;
