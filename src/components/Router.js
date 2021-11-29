import React from "react";
import { Route, Switch, HashRouter as Router } from "react-router-dom";
import Auth from "../routers/Auth";
import Home from "../routers/Home";
import Profile from "routers/Profile";
import Navigation from "./Navigation";
const RouterComponent = ({ isLogin, userObj }) => {
  return (
    <>
      <Router>
        {isLogin && <Navigation />}
        <Switch>
          {isLogin ? (
            <>
              <Route exact path="/">
                <Home userObj={userObj} />
              </Route>

              <Route exact path="/profile">
                <Profile userObj={userObj} />
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
