import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { area, type, letter } from "./singerCatlistConfig";

import SingerCatlist from "./SingerCatlist";

const Singerlist = (props) => {
  const { handleSaveSingerId } = props;
  const areaHash = {
    华语: 7,
    欧美: 96,
    日本: 8,
    韩国: 16,
    其他: 0,
  };
  const sourceData = { area, type, letter };
  const [singerlist, setSingerlist] = useState(undefined);
  const [page, setPage] = useState(1);
  const [singerlistLength, setSingerlistLength] = useState(0);
  const [aCatlist, setACatlist] = useState(-1);
  const [aArea, setAArea] = useState(-1);
  const [aLetter, setALetter] = useState(-1);
  const getClassify = (key, value) => {
    switch (key) {
      case "area":
        value === "全部" ? setAArea(-1) : setAArea(areaHash[value]);
        break;
      case "catlist":
        let catIndex = type.findIndex((item) => {
          return item === value;
        });
        catIndex === 0 ? setACatlist(-1) : setACatlist(catIndex);
        break;
      case "letter":
        value === "热门" ? setALetter(-1) : setALetter(value);
      default:
        return;
    }
  };
  useEffect(() => {
    // console.log(aArea, aCatlist, aLetter);
    Axios.get(
      `/api/artist/list?type=${aCatlist}&area=${aArea}&initial=${aLetter}&limit=50`
    ).then(({ data }) => {
      setSingerlist(data.artists);
    });
  }, [aArea, aCatlist, aLetter]);
  useEffect(() => {
    Axios.get(
      `/api/artist/list?area=${aArea}&type=${aCatlist}&initial=${aLetter}&limit=50&offset=${
        (page - 1) * 50
      }`
    ).then(({ data }) => {
      if (data.code === 200) {
        let singers =
          singerlist === undefined
            ? data.artists
            : [...singerlist, ...data.artists];
        setSingerlist(singers);
        setSingerlistLength(singers.length);
      }
    });
  }, [page]);

  useEffect(() => {
    if (document.querySelector(".singerlist-bottom") === null) return;
    var intersectionObserver = new IntersectionObserver(function (entries) {
      // 如果不可见，就返回
      if (entries[0].intersectionRatio <= 0) return;
      setPage(page + 1);
      intersectionObserver.unobserve(
        document.querySelector(".singerlist-bottom")
      );
    });
    // 开始观察
    intersectionObserver.observe(document.querySelector(".singerlist-bottom"));
  }, [singerlistLength]);

  return (
    <>
      <div>
        <SingerCatlist sourceData={sourceData} getClassify={getClassify} />
        {singerlist !== undefined ? (
          <>
            <div className="singerlist-wrapper">
              {singerlist.map((item) => {
                return (
                  <Link to={`/singer?id=${item.id}`} key={item.id} onClick={()=>handleSaveSingerId(item.id)}>
                    <div className="singerlist-item-wrapper">
                      <img src={item.picUrl} width="180px" height="180px" />
                      <h3 className="singer-name">{item.name}</h3>
                    </div>
                  </Link>
                );
              })}
            </div>
            <div className="singerlist-bottom">数据加载中...</div>
          </>
        ) : (
          "歌手正在赶来的路上..."
        )}
      </div>
    </>
  );
};

export default Singerlist;
