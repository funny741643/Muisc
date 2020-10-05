import React, { Component } from "react";
import { Route } from "react-router-dom";
import './style.css'

class Body extends Component {
  state = { config: [] };
  componentDidMount() {
    this.setState({
      config: this.props.config,
    });
  }
  render() {
    return (
      <div className="body">
        {this.state.config.map(({ path, component, key }) => {
          return <Route path={path} component={component} key={key} />;
        })}
      </div>
    );
  }
}

export default Body;
