import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Popover } from "antd";

import "./style.css";
import "./SingerTag";
import SingerTag from "./SingerTag";

const Singer = (props) => {
  const { singer: singerId } = props;
  const [artistDesc, setArtistDesc] = useState(undefined);
  const [artistSong, setArtistSong] = useState(undefined);
  const [artistMv, setArtistMv] = useState(undefined);
  const [artistAlbum, setArtistAlbum] = useState(undefined);
  const content =
    artistDesc === undefined ? (
      <div>
        <p>信息加载中...</p>
      </div>
    ) : (
      <div className="artistDesc-wrapper">
        <div className="artistDesc-briefDesc artistDesc-txt">
          {artistDesc.briefDesc}
        </div>
        <hr />
        <div className="artistDesc-introduction">
          {artistDesc.introduction.map((item, index) => {
            return (
              <div key={index}>
                <h3>{item.ti}</h3>
                {console.log(item.txt.split("▪"))}
                <ul className="artistDesc-txt">
                  {item.txt.split("▪").map((item, index) => {
                    return <li key={index}>{item}</li>;
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    );
  useEffect(() => {
    Axios.get(`/api/artists?id=${singerId}`).then(({ data }) => {
      setArtistSong(data);
    });
    Axios.get(`/api/artist/mv?id=${singerId}`).then(({ data }) => {
      setArtistMv(data);
    });
    Axios.get(`/api/artist/album?id=${singerId}`).then(({ data }) => {
      setArtistAlbum(data);
    });
  }, []);
  const handleGetSingerDesc = () => {
    Axios.get(`/api/artist/desc?id=${singerId}`).then((res) => {
      setArtistDesc(res.data);
    });
  };
  return (
    <div className="singer-wrapper">
      {artistSong !== undefined ? (
        <div className="singer-info-wrapper">
          <div className="singer-img">
            <img src={artistSong.artist.picUrl} width="200px" height="200px" />
          </div>
          <div className="singer-info">
            <h2>{artistSong.artist.name}</h2>
            <Popover
              placement="rightTop"
              content={content}
              trigger="click"
              onClick={handleGetSingerDesc}
            >
              <Button>歌手详情</Button>
            </Popover>
          </div>
        </div>
      ) : (
        "页面加载中"
      )}
      <SingerTag
        sourceData={{ artistSong, artistMv, artistAlbum }}
        handleSavePlayId={props.handleSavePlayId}
        handleSaveAlbum={props.handleSaveAlbum}
        handleSaveMvId={props.handleSaveMvId}
      />
    </div>
  );
};

export default Singer;
