import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Collapse, Pagination } from "antd";
import { Link } from "react-router-dom";
import SonglistClass from "./SonglistClass";
import "./style.css";

const { Panel } = Collapse;

const Songlist = (props) => {
  const [songlistClassData, setSonglistClassData] = useState(undefined);
  const [songlistData, setSonglistData] = useState(undefined);
  const [songlistClassname, setSonglistClassname] = useState("全部");
  const [activeKey, setActiveKey] = useState("0");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(50);
  useEffect(() => {
    Axios.get("/api/playlist/catlist").then(({ data }) => {
      if (data.code === 200) {
        setSonglistClassData(data);
      }
    });
    Axios.get("/api/top/playlist?limit=50").then(({ data }) => {
      if (data.code === 200) {
        setSonglistData(data.playlists);
      }
    });
  }, []);
  const getSonglistClassname = (data) =>{
    setSonglistClassname(data);
    setActiveKey("0");
  }
  const resetPage = (page) => {
    setCurrentPage(page)
  }
  const handleCollapseChange = () => {
    activeKey === "0" ? setActiveKey("1") : setActiveKey("0");
  };
  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setCurrentPageSize(pageSize);
  };
  useEffect(() => {
    Axios.get(
      `/api/top/playlist?limit=50&offset=${
        (currentPage - 1) * currentPageSize
      }&cat=${songlistClassname}`
    ).then(({ data }) => {
      if (data.code === 200) {
        setSonglistData(data.playlists);
        if(currentPage === 1) {
          return props.history.push(
            `/discover/songlist?cat=${songlistClassname}`
          );
        }
        props.history.push(
          `/discover/songlist?page=${currentPage}&cat=${songlistClassname}`
        );
      }
    });
  }, [currentPage, songlistClassname]);
  return (
    <>
      {songlistData !== undefined && songlistClassData !== undefined ? (
        <div>
          <div className="songlist-class">
            <Collapse activeKey={activeKey} onChange={handleCollapseChange}>
              <Panel header="点击查看全部歌单分类" key="1">
                <SonglistClass
                  sourceData={songlistClassData}
                  getClassname = {getSonglistClassname}
                  resetPage={resetPage}
                />
              </Panel>
            </Collapse>
            <div className="songlist-classname">{songlistClassname}</div>
          </div>
          <div className="songlist-gallery">
            {songlistData.map((item) => {
              return (
                <Link to={`/playlist/?id=${item.id}`} key={item.id}>
                  <div className="songlist-item-wrapper">
                    <img src={item.coverImgUrl} width="230px" height="230px" />
                    <h3 className="songlist-name">{item.name}</h3>
                  </div>
                </Link>
              );
            })}
          </div>
          <div style={{ height: "72px", padding: "20px 0" }}>
            <Pagination
              current={currentPage}
              total={300}
              pageSize={50}
              showSizeChanger={false}
              onChange={handlePageChange}
            />
          </div>
        </div>
      ) : (
        "页面正在加载中..."
      )}
    </>
  );
};

export default Songlist;
