import React, { Component } from "react";
import { Input, Button } from "antd";

import "./style.css";

const { Search } = Input;

class Header extends Component {
  render() {
    return (
      <div className="header">
        <div className="header-wrapper">
          <h1 className="logo">MUSIC</h1>
          <div className="top-func">
            <div className="search">
              <Search
                placeholder="input search text"
                onSearch={(value) => console.log(value)}
                style={{ width: 200 }}
              />
            </div>
            <div className="login">
              <Button>登录</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
