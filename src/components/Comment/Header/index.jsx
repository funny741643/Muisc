import React, { Component } from "react";
import {
  Input,
  Button,
  Modal,
  Form,
  Select,
  Dropdown,
  Menu,
  message,
} from "antd";
import { DownOutlined } from "@ant-design/icons";
import Axios from "axios";

import "./style.css";
const { Option } = Select;

const { Search } = Input;

class Header extends Component {
  state = {
    visible: false,
    loginWay: 1,
    phone: "",
    password: "",
    authCode: "",
    user: null,
  };
  handleInputChange = (e) => {
    switch (e.target.name) {
      case "phone":
        return this.setState({
          phone: e.target.value,
        });
      case "password":
        return this.setState({
          password: e.target.value,
        });
      default:
        return this.setState({
          authCode: e.target.value,
        });
    }
  };
  handleShowModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleCancelModal = () => {
    this.setState({
      visible: false,
    });
  };
  handleTurnLoginWay = () => {
    let way = this.state.loginWay === 1 ? 2 : 1;
    this.setState({
      loginWay: way,
    });
  };
  handlePasswordLogin = () => {
    Axios.get(
      `/api/login/cellphone?phone=${this.state.phone}&password=${this.state.password}`
    ).then(({ data: res }) => {
      if (res.code === 200) {
        this.setState(
          {
            user: res.profile,
            visible: false,
          },
          () => {
            message.success("登录成功！");
          }
        );
      } else {
        message.error("请检查账号或密码是否正确！");
      }
    });
  };
  handleAuthCodeLogin = () => {
    Axios.get(
      `/api/captcha/verify?phone=${this.state.phone}&captcha=${this.state.authCode}`
    ).then((res) => {
      console.log(res);
    });
  };
  handleLogout = () => {
    Axios.get("/api/logout").then(({ data: res }) => {
      if (res.code === 200) {
        this.setState(
          {
            user: null,
          },
          () => {
            message.success("退出登录成功！");
          }
        );
      }
    });
  };
  handleSendAuthCode = () => {
    Axios.get(`/api/captcha/sent?phone=${this.state.phone}`).then((res) => {
      console.log(res);
    });
  };

  componentDidMount = () => {
    Axios.get(`/api/login/status`).then(({ data: res }) => {
      if (res.code === 200) {
        this.setState({
          user: res.profile,
        });
      }
    });
  };
  render() {
    const SendAuthCodeBtn = (
      <span className="send-authCode-btn" onClick={this.handleSendAuthCode}>
        发送验证码
      </span>
    );
    const menu = (
      <Menu>
        <Menu.Item key="0">
          <span onClick={this.handleLogout}>退出登录</span>
        </Menu.Item>
      </Menu>
    );
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
              {this.state.user ? (
                <div className="userInfo-wrapper">
                  <div className="avater-wrapper">
                    <img
                      src={this.state.user.avatarUrl}
                      width="35px"
                      height="35px"
                    />
                  </div>
                  <div className="user-nickname">
                    <div>{this.state.user.nickname}</div>
                  </div>
                  <Dropdown overlay={menu} trigger={["click"]}>
                    <DownOutlined />
                  </Dropdown>
                </div>
              ) : (
                <Button onClick={this.handleShowModal}>登录</Button>
              )}
              <Modal
                title="登录"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancelModal}
                footer={null}
              >
                {this.state.loginWay === 1 ? (
                  <Form onFinish={this.handlePasswordLogin}>
                    <Form.Item
                      name="phone"
                      label="手机号"
                      rules={[
                        {
                          required: true,
                          message: "请输入你的手机号!",
                        },
                      ]}
                    >
                      <Input
                        style={{ width: "100%" }}
                        name="phone"
                        onChange={this.handleInputChange}
                      />
                    </Form.Item>
                    <Form.Item
                      label="密码"
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "请输入用户密码!",
                        },
                      ]}
                    >
                      <Input.Password
                        name="password"
                        onChange={this.handleInputChange}
                      />
                    </Form.Item>
                    <Form.Item className="login-btn-wrapper">
                      <Button
                        className="turn-loginWay-btn"
                        onClick={this.handleTurnLoginWay}
                      >
                        验证码登录
                      </Button>
                      <Button type="primary" htmlType="submit">
                        确定登录
                      </Button>
                    </Form.Item>
                  </Form>
                ) : (
                  <Form onFinish={this.handleAuthCodeLogin}>
                    <Form.Item
                      name="phone"
                      label="手机号"
                      rules={[
                        {
                          required: true,
                          message: "请输入你的手机号!",
                        },
                      ]}
                    >
                      <Input
                        style={{ width: "100%" }}
                        addonAfter={SendAuthCodeBtn}
                        onChange={this.handleInputChange}
                        name="phone"
                      />
                    </Form.Item>
                    <Form.Item
                      label="验证码"
                      name="authCode"
                      rules={[
                        {
                          required: true,
                          message: "请输入您的验证码!",
                        },
                      ]}
                    >
                      <Input
                        onChange={this.handleInputChange}
                        name="authCode"
                      />
                    </Form.Item>
                    <Form.Item className="login-btn-wrapper">
                      <Button
                        className="turn-loginWay-btn"
                        onClick={this.handleTurnLoginWay}
                      >
                        账号密码登录
                      </Button>
                      <Button type="primary" htmlType="submit">
                        确定登录
                      </Button>
                    </Form.Item>
                  </Form>
                )}
              </Modal>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
