import * as React from "react";
import { Component } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import FrontendAuth from "./FrontendAuth";
import { routerConfig } from "./routerConfig";

export default class Root extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <FrontendAuth config={routerConfig} />
        </Switch>
      </BrowserRouter>
    );
  }
}
