import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

class FrontendAuth extends Component {
  render() {
    return (
      <>
        <Redirect from="/" to="/discover" />
        {this.props.config.map(({ path, component, key }) => {
          return <Route path={path} component={component} key={key} />;
        })}
      </>
    );
  }
}

export default FrontendAuth;
