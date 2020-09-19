import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

// import PlaylistBody from "./PlaylistBody";
import PlaylistBody from "../containers/PlaylistBodyWrapper";
import "./style.css";

const Playlist = (props) => {
  const { handleSave, handleSavePlaylistId } = props;
  const [playlist, setPlaylist] = useState({});
  useEffect(() => {
    Axios.get(`/api/playlist/detail/${props.location.search}`).then((res) => {
      if (res.status === 200) {
        setPlaylist(res.data.playlist);
        handleSave(res.data.playlist.tracks);
        handleSavePlaylistId(res.data.playlist.id)
      }
    });
  }, [props.location.search]);

  return Object.keys(playlist).length !== 0 ? (
    <div className="playlist-wrapper">
      <div className="playlist-header">
        <div className="playlist-img">
          <img src={playlist.coverImgUrl} width="300px" height="300px" />
        </div>
        <div className="playlist-info">
          <h2>{playlist.name}</h2>
          <div className="playlist-creator">
            <p>
              创建者：<Link to="/">{playlist.creator.nickname}</Link>
            </p>
          </div>
          <div className="playlist-tag">
            <span>标签:{playlist.expertTags}</span>
          </div>
          <div className="playlist-description">{playlist.description}</div>
        </div>
      </div>
      <PlaylistBody tracks={playlist.tracks} />
    </div>
  ) : (
    <p>页面加载中...</p>
  );
};

export default Playlist;
