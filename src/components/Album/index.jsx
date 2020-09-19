import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Table } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";
import "./style.css";
import Axios from "axios";

const Album = ({ album, handleSavePlayId }) => {
  const [playlist, setPlaylist] = useState(undefined);
  const [playData, setPlayData] = useState(undefined);
  useEffect(() => {
    Axios.get(`/api/album?id=${album.id}`).then(({ data }) => {
      if (data.code === 200) {
        let songs = data.songs;
        let playData = [];
        for (let i = 0; i < songs.length; i++) {
          playData.push({ name: songs[i].name, key: songs[i].privilege.id });
        }
        setPlaylist(playlist);
        setPlayData(playData);
      }
    });
  }, [album.id]);
  const columns = [
    {
      title: "音乐标题",
      dataIndex: "name",
      width: 1000,
    },
    {
      title: "操作",
      dataIndex: "operation",
      render: (text, record) => {
        return playlist === undefined ? (
          <Button
            icon={<PlayCircleOutlined />}
            onClick={() => {
              handleSavePlayId(record.key);
            }}
          />
        ) : null;
      },
    },
  ];
  // const getData = () => {};

  const getLocalTime = (nS) => {
    return new Date(parseInt(nS)).toLocaleString().replace(/:\d{1,2}$/, " ");
  };
  return (
    <div className="album-wrapper">
      <div className="album-header">
        <div className="album-image">
          <img src={album.picUrl} width="250px" height="250px" />
        </div>
        <div className="album-info">
          <h2>{album.name}</h2>
          <Link to="#">
            <p>歌手: {album.artist.name}</p>
          </Link>
          <p>发行时间: {getLocalTime(album.publishTime)}</p>
          <p>发行公司: {album.company}</p>
        </div>
      </div>
      <div className="album-body">
        <Table
          columns={columns}
          dataSource={playData}
          scroll={{ y: 240 }}
          pagination={false}
        />
      </div>
    </div>
  );
};

export default Album;
