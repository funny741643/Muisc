import React, { Component } from "react";
import { Route } from "react-router-dom";
class Body extends Component {
  state = { config: [] };
  componentDidMount() {
    this.setState({
      config: this.props.config,
    });
  }
  render() {
    return (
      <div style={{ width: "100%", marginBottom: "56px", padding: "0 50px" }}>
        {this.state.config.map(({ path, component, key }) => {
          return <Route path={path} component={component} key={key} />;
        })}
      </div>
    );
  }
}

export default Body;
