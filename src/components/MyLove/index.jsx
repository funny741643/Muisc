import React from "react";
import Axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css";

const MyFM = (props) => {
  console.log(props);
  const [userId, setUserId] = useState(undefined);
  const [loveMusicIds, setLoveMusicIds] = useState(null);
  const [loveMusics, setLoveMusics] = useState(null);
  useEffect(() => {
    Axios.get(`/api/login/status`).then(({ data: res }) => {
      if (res.code === 200) {
        setUserId(res.profile.userId);
      }
    });
  }, []);
  useEffect(() => {
    Axios.get(`/api/likelist?uid=${userId}`).then(({ data: res }) => {
      if (res.code === 200) {
        setLoveMusicIds(res.ids);
      }
    });
  }, [userId]);
  useEffect(() => {
    if (loveMusicIds !== null) {
      let loveMusicIdsStr = loveMusicIds.join(",");
      Axios.get(`/api/song/detail?ids=${loveMusicIdsStr}`).then(
        ({ data: res }) => {
          if (res.code === 200) {
            setLoveMusics(res.songs);
          }
        }
      );
    }
    return;
  }, [loveMusicIds]);
  const getSongSinger = (arr) => {
    return arr.map((item) => {
      return (
        <Link
          to={`/singer?id=${item.id}`}
          key={item.id}
          onClick={() => {
            props.handleSaveSingerId(item.id);
          }}
        >
          <span>{item.name} </span>
        </Link>
      );
    });
  };
  return (
    <div className="love-music-gallery">
      {console.log(loveMusics)}
      {loveMusics !== null
        ? loveMusics.map((item) => {
            return (
              <div
                key={item.id}
                className="love-music-item"
                onDoubleClick={() => {
                  props.handleSavePlayId(item.id);
                }}
              >
                <div className="love-music-item-name">{item.name}</div>
                <div className="love-music-item-singer">
                  {getSongSinger(item.ar)}
                </div>
              </div>
            );
          })
        : "数据加载中..."}
    </div>
  );
};

export default MyFM;
