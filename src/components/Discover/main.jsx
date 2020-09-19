import React, { Component } from "react";
import { Route } from "react-router-dom";

class Main extends Component {
  render() {
    return (
      <div>
        {this.props.config.map(({ path, component, exact, key }) => {
          return (
            <Route path={path} component={component} exact={exact} key={key} />
          );
        })}
      </div>
    );
  }
}

export default Main;
