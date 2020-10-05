import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { PlayCircleOutlined } from "@ant-design/icons";
import "./style.css";

const Ranklist = (props) => {
  // console.log(props);
  const [officialList, setOfficialList] = useState([]);
  const [officialListDetail, setOfficialListDetail] = useState([]);
  const [worldList, setWorldList] = useState(undefined);
  useEffect(() => {
    Axios.get("/api/toplist").then(({ data }) => {
      setOfficialList(data.list.slice(0, 4));
      setWorldList(data.list.slice(4));
    });
  }, []);

  useEffect(() => {
    let res = [];
    for (let i = 0; i < officialList.length; i++) {
      Axios({
        method: "get",
        url: `/api/playlist/detail/?id=${officialList[i].id}`,
        async: false,
      }).then(({ data }) => {
        officialList[i].detail = data.playlist;
        res.push(data.playlist);
        setOfficialListDetail([...res]);
      });
    }
  }, [officialList.length]);

  return (
    <>
      <div>
        {/* {console.log(officialList)} */}
        <h2>官方榜:</h2>
        <div className="gov-gallery">
          {officialList.length !== 0 && officialListDetail.length === 4
            ? officialList.map((topItem) => {
                return (
                  <div key={topItem.id}>
                    <div className="gov-item-cover">
                      <PlayCircleOutlined
                        className="toplist-play-btn"
                        style={{ fontSize: "30px", color: "#fff" }}
                        onClick={() => {
                          props.handleSavePlaylistId(topItem.id);
                          props.handleSavePlayId(topItem.detail.tracks[0].id);
                          props.handleSave(topItem.detail.tracks);
                        }}
                      />
                      <img
                        src={topItem.coverImgUrl}
                        width="250px"
                        height="100px"
                      />
                    </div>
                    <ul className="gov-item-playlist">
                      {topItem.detail.tracks.slice(0, 9).map((item, index) => {
                        return (
                          <li
                            className="gov-item-playlist-item"
                            key={item.id}
                            onDoubleClick={() => {
                              props.handleSavePlayId(item.id);
                            }}
                          >{`${index + 1} ${item.name}`}</li>
                        );
                      })}
                      <Link to={`/playlist/?id=${topItem.id}`}>
                        <li className="gov-item-playlist-item get-more-item">
                          点击查看更多{">"}
                        </li>
                      </Link>
                    </ul>
                  </div>
                );
              })
            : "数据正在加载中..."}
        </div>
      </div>
      <div>
        <h2>全球榜:</h2>
        <div className="world-gallery">
          {worldList !== undefined
            ? worldList.map((item) => {
                return (
                  <Link to={`/playlist/?id=${item.id}`}>
                    <div className="world-item-cover">
                      <img
                        src={item.coverImgUrl}
                        width="180px"
                        height="180px"
                      />
                    </div>
                  </Link>
                );
              })
            : "信息正在加载中..."}
        </div>
      </div>
    </>
  );
};

export default Ranklist;
