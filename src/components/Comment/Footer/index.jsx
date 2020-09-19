import React, { useState, useEffect } from "react";
import { Button } from "antd";
import {
  CaretRightOutlined,
  CaretLeftOutlined,
  ArrowsAltOutlined,
} from "@ant-design/icons";
import Axios from "axios";
import "./style.css";

const Footer = (props) => {
  // 所点击的歌曲id， 歌单， 歌单id
  let { playId, playlist, playlistId } = props.playlist;
  // 正在播放音乐的url
  const [playUrl, setPlayUrl] = useState("");
  // 音乐的Id
  const [playKey, setPlayKey] = useState(playId);
  // 歌单列表
  const [playDetail, setPlayDetail] = useState(undefined);
  // 有效的歌曲列表, url,id
  const [musicUrls, setMusicUrls] = useState([]);
  // 正在播放音乐的index
  const [playIndex, setPlayIndex] = useState(0);

  // 获取歌单列表，并重新组织为有权限歌曲的列表
  useEffect(() => {
    console.log(playlist);
    let musics = [];
    for (let i = 0; i < playlist.length; i++) {
      Axios({
        method: "get",
        url: `/api/song/url?id=${playlist[i].id}`,
        async: false,
      }).then(({ data }) => {
        if (data.data[0].url !== null) {
          let musicData = {
            url: data.data[0].url,
            id: data.data[0].id,
          };
          musics.push(musicData);
        }
      });
    }
    setMusicUrls(musics);
  }, [playlistId]);

  // 获取歌曲详情， 歌曲所在歌单的下标， 歌曲的playkey
  useEffect(() => {
    if (playId !== undefined) {
      Axios.get(`/api/song/detail?ids=${playId}`).then(({ data }) => {
        setPlayDetail(data.songs[0]);
      });
    }
    if (playlist.length !== 0) {
      let item = playlist.find((item) => {
        return item.id === playId;
      });
      let index = playlist.indexOf(item);
      setPlayDetail(playlist[index]);
      setPlayIndex(index);
    }
    setPlayKey(playId);
  }, [playId, playlist]);

  // 获取单曲的url
  useEffect(() => {
    Axios.get(`/api/song/url?id=${playKey}`).then(({ data }) => {
      if (data.code === 200) {
        if (data.data[0].url !== null) {
          setPlayUrl(data.data[0].url);
        }
      }
    });
  }, [playKey]);

  // 一首歌曲播放结束后的逻辑
  const handleOnEnded = () => {
    if (playlist.length === 0) return;
    let item = musicUrls.find((item) => {
      return item.url === playUrl;
    });
    let index = musicUrls.indexOf(item);
    let nextIndex =
      index === musicUrls.length - 1 ? 0 : (index % musicUrls.length) + 1;
    let playIndex = playlist.findIndex((play) => {
      return play.id === musicUrls[nextIndex].id;
    });
    setPlayUrl(musicUrls[nextIndex].url);
    setPlayDetail(playlist[playIndex]);
  };
  
  const handlePlayPre = () => {
    if (playlist.length === 0) return;
    let preIndex = playIndex === 0 ? playlist.length - 1 : playIndex - 1;
    setPlayIndex(preIndex);
    let preMusicIndex = musicUrls.findIndex((music) => {
      return music.id === playlist[preIndex].id;
    });
    if (preMusicIndex !== -1) {
      setPlayUrl(musicUrls[preMusicIndex].url);
      setPlayDetail(playlist[preIndex]);
    }
  };
  const handlePlayNext = () => {
    if (playlist.length === 0) return;
    let nextIndex = playIndex === playlist.length - 1 ? 0 : playIndex + 1;
    setPlayIndex(nextIndex);
    let nextMusicIndex = musicUrls.findIndex((music) => {
      return music.id === playlist[nextIndex].id;
    });
    if (nextMusicIndex !== -1) {
      setPlayUrl(musicUrls[nextMusicIndex].url);
      setPlayDetail(playlist[nextIndex]);
    }
  };
  return (
    <div className="footer-wrapper">
      {playDetail !== undefined ? (
        <div className="song-detail-button">
          <ArrowsAltOutlined
            style={{ fontSize: "56px", color: "rgba(255, 255, 255, 0.7)" }}
            className="song-detail-display"
          />
          <img src={playDetail.al.picUrl} width="54px" height="54px" />
          <div className="song-detail-info">
            <p className="playing-name">{playDetail.name}</p>
            <p className="playing-singer-name">{playDetail.ar[0].name}</p>
          </div>
        </div>
      ) : null}
      <div className="footer-audio">
        <audio
          onEnded={handleOnEnded}
          className="audio"
          autoPlay
          controls
          src={playUrl}
        ></audio>
      </div>
      <div className="footer-control-button">
        <Button
          onClick={handlePlayPre}
          className="play-turn-button"
          icon={<CaretLeftOutlined />}
          size="large"
        />
        <Button
          onClick={handlePlayNext}
          className="play-turn-button"
          icon={<CaretRightOutlined />}
          size="large"
        />
      </div>
    </div>
  );
};

export default Footer;
