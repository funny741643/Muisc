import React, { useState, useEffect } from "react";
import { Menu, Table, message } from "antd";
import Axios from "axios";

const PlaylistBody = (props) => {
  const { tracks, handleSavePlayId } = props;
  const [current, setCurrent] = useState("playlist-list");
  const columns = [
    {
      title: "音乐标题",
      dataIndex: "name",
      width: 300,
    },
    {
      title: "歌手",
      dataIndex: "singer",
      width: 250,
    },
    {
      title: "专辑",
      dataIndex: "album",
      width: 250,
    },
    {
      title: "时长",
      dataIndex: "during",
      width: 100,
    },
    {
      title: "操作",
      dataIndex: "operation",
      render: (text, record) =>
        tracks.length >= 1 ? (
          <a
            onClick={() => {
              Axios.get(`/api/check/music?id=${record.key}`).then((res) => {
                try {
                  let { data } = res;
                  if (data.success) {
                    handleSavePlayId(record.key);
                  } else {
                    message.error("对不起，该音乐暂无版权~~");
                  }
                } catch {
                  message.error("请求音乐资源失败~~");
                }
              });
            }}
          >
            播放
          </a>
        ) : null,
    },
  ];
  const data = [];
  for (let i = 0; i < tracks.length; i++) {
    let track = tracks[i];
    let singer = "";
    for (let i = 0; i < track.ar.length; i++) {
      singer += track.ar[i].name + " ";
    }
    data.push({
      key: track.id,
      name: track.name,
      singer: singer,
      album: track.al.name,
      during: "4:05",
    });
  }

  return (
    <>
      <Menu selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="playlist-list">歌曲列表</Menu.Item>
        <Menu.Item key="playlist-comment">评论</Menu.Item>
      </Menu>
      <div className="playlist-list">
        <Table
          columns={columns}
          dataSource={data}
          scroll={{ y: 240 }}
          pagination={false}
        />
      </div>
    </>
  );
};

export default PlaylistBody;
