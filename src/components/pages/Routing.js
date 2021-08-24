import React from "react";

import WorkoutPage from "./WorkoutPage";
import Settings from "./Settings";
import NotFound from "./NotFound";
import FrontPage from "./FrontPage";

import { Redirect, Route, Switch } from "react-router-dom";

const Routing = (props) => {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Redirect to="/main" />
        </Route>

        <Route path="/main">
          <FrontPage />
        </Route>

        <Route exact path="/workout">
          <WorkoutPage />
        </Route>

        <Route exact path="/settings">
          <Settings />
        </Route>
        <Route path="/*">
          <NotFound />
        </Route>
      </Switch>
    </>
  );
};

export default Routing;
