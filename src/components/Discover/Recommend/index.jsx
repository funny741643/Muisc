import React, { useEffect, useState } from "react";
import Axios from "axios";
import RecommendSonglist from "./RecommendSonglist";
import NewDisc from "./NewAlbums";
import NewSongs from "../../containers/NewSongsWrapper";

const Recommend = () => {
  const [blocks, setBlocks] = useState([]);
  const [newDiscs, setNewDiscs] = useState([]);
  const [newSongs, setNewSongs] = useState([]);
  useEffect(() => {
    // 获取推荐歌单
    Axios.get("api/homepage/block/page").then((res) => {
      setBlocks(res.data.data.blocks);
    });
    // 获取最新专辑
    Axios.get("/api/album/newest").then(({ data }) => {
      if (data.code === 200) {
        setNewDiscs(data.albums);
      }
    });
    // 获取最新歌曲
    Axios.get("/api/personalized/newsong").then(({ data }) => {
      if (data.code === 200) {
        setNewSongs(data.result);
      }
    });
  }, []);
  return (
    <div>
      {blocks.length !== 0 && newDiscs.length !== 0 ? (
        <>
          <RecommendSonglist data={blocks[0]} />
          <NewDisc data={newDiscs} />
          <NewSongs data={newSongs} />
        </>
      ) : (
        "页面加载中..."
      )}
    </div>
  );
};

export default Recommend;
