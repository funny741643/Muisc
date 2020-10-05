import React, { Component } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import {
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from "@ant-design/icons";
import "./style.css";

const { SubMenu } = Menu;
class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar">
        <Menu
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          theme="light"
        >
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            <Link to="/discover">发现音乐</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            <Link to="/myfm">私人FM</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<ContainerOutlined />}>
            <Link to="/">我的收藏</Link>
          </Menu.Item>
          <SubMenu key="sub1" icon={<MailOutlined />} title="我的歌单">
            <Menu.Item key="4">Option 5</Menu.Item>
            <Menu.Item key="5">Option 6</Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    );
  }
}

export default Sidebar;
