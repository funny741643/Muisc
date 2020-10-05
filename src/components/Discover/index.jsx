import React, { useState } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import Main from "./main";
import { routerConfig } from "./routerConfig";

import "./style.css";

const Discover = (props) => {
  return (
    <div className="discover-wrapper">
      <Menu
        selectedKeys={[props.location.pathname]}
        mode="horizontal"
        className="discover-nav"
      >
        <Menu.Item key="/discover">
          <Link to="/discover">个性推荐</Link>
        </Menu.Item>
        <Menu.Item key="/discover/songlist">
          <Link to="/discover/songlist">歌单</Link>
        </Menu.Item>
        <Menu.Item key="/discover/ranklist">
          <Link to="/discover/ranklist">排行榜</Link>
        </Menu.Item>
        <Menu.Item key="/discover/singerlist">
          <Link to="/discover/singerlist">歌手</Link>
        </Menu.Item>
      </Menu>
      <Main config={routerConfig} />
    </div>
  );
};

export default Discover;
