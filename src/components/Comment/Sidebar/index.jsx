import React, { useEffect, useState } from "react";
import { Menu, Modal, Form, Input, Checkbox, Button, Message } from "antd";
import { Link } from "react-router-dom";
import Axios from "axios";
import {
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
  // DeleteOutlined,
} from "@ant-design/icons";
import "./style.css";

const { SubMenu } = Menu;
const Sidebar = () => {
  const [userId, setUserId] = useState(undefined);
  const [myPlaylist, setMyPlaylist] = useState(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    Axios.get(`/api/login/status`).then(({ data: res }) => {
      if (res.code === 200) {
        setUserId(res.profile.userId);
      }
    });
  }, []);
  useEffect(() => {
    if (userId !== undefined) {
      getMyPlaylist();
    }
    return;
  }, [userId]);
  // 创建新歌单
  const onFinish = (value) => {
    console.log(value);
    Axios.get(
      `/api/playlist/create?name=${value.playlistName}&privacy=${
        value.isPrivate ? "10" : "0"
      }`
    ).then(({ data: res }) => {
      if (res.code === 200) {
        Message.success("创建歌单成功");
        getMyPlaylist();
      }
    });
    setVisible(false);
  };
  // 获取用户全部歌单
  const getMyPlaylist = () => {
    Axios.get(`/api/user/playlist?uid=${userId}`).then(({ data: res }) => {
      if (res.code === 200) {
        setMyPlaylist(res.playlist);
      }
    });
  };
  const handleCancelModal = () => {
    setVisible(false);
  };
  const showAddModal = () => {
    setVisible(true);
  };
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
        <Menu.Item key="2" icon={<ContainerOutlined />}>
          <Link to="/fm">我的收藏</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<DesktopOutlined />}>
          <Link to="/mylove">我的喜欢</Link>
        </Menu.Item>
        <SubMenu key="sub1" icon={<MailOutlined />} title="我的歌单">
          <Menu.Item key="4" onClick={showAddModal}>
            新建歌单+
          </Menu.Item>
          {myPlaylist !== null
            ? myPlaylist.map((item) => {
                return (
                  <Menu.Item key={item.id}>
                    <Link to={`/playlist/?id=${item.id}`}>{item.name}</Link>
                  </Menu.Item>
                );
              })
            : null}
        </SubMenu>
      </Menu>
      <Modal
        title="创建新歌单"
        visible={visible}
        onCancel={handleCancelModal}
        footer={false}
      >
        <Form onFinish={onFinish}>
          <Form.Item name="playlistName" label="歌单名">
            <Input />
          </Form.Item>
          <Form.Item name="isPrivate" valuePropName="checked">
            <Checkbox>设置为私密歌单</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit">确认新建</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Sidebar;
