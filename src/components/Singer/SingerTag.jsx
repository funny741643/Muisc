import React from "react";
import { Tabs, Button, Table } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
// import Axios from "axios";

const { TabPane } = Tabs;

const SingerTag = (props) => {
  const handleSavePlayId = props.handleSavePlayId;
  const handleSaveMvId = props.handleSaveMvId;
  const { artistSong, artistMv, artistAlbum } = props.sourceData;
  const hotSongs =
    artistSong === undefined
      ? undefined
      : artistSong.hotSongs.map((item) => {
          return { name: item.name, key: item.privilege.id };
        });
  const mvs = artistMv === undefined ? undefined : artistMv.mvs;
  const albums = artistAlbum === undefined ? undefined : artistAlbum.hotAlbums;

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
        return hotSongs !== undefined ? (
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
  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="热歌50首" key="1">
        {hotSongs !== undefined ? (
          <div>
            <div className="album-body">
              <Table
                columns={columns}
                dataSource={hotSongs}
                scroll={{ y: 240 }}
                pagination={false}
              />
            </div>
          </div>
        ) : (
          "信息正在处理中..."
        )}
      </TabPane>
      <TabPane tab="专辑" key="2">
        {albums !== undefined ? (
          <div className="albums-gallery">
            {albums.map((item) => {
              return (
                <Link
                  to={`/album/id=${item.id}`}
                  key={item.id}
                  onClick={() => {
                    props.handleSaveAlbum(item);
                  }}
                >
                  <div className="aAlbum">
                    <div className="album-img">
                      <img src={item.picUrl} width="150px" height="150px" />
                    </div>
                    <p>{item.name}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          "信息正在处理中..."
        )}
      </TabPane>
      <TabPane tab="Mv" key="3">
        {mvs !== undefined ? (
          <div className="mvs-gallery">
            {mvs.map((item) => {
              return (
                <Link
                  to={`/mv?id=${item.id}`}
                  key={item.id}
                  onClick={() => {
                    props.handleSaveMvId(item.id);
                  }}
                >
                  <div className="amv">
                    <div className="mvs-img">
                      <img src={item.imgurl} width="150px" height="100px" />
                    </div>
                    <p>{item.name}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          "信息正在处理中..."
        )}
      </TabPane>
    </Tabs>
  );
};

export default SingerTag;
