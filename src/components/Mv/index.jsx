import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Comment, Tooltip, Avatar } from "antd";
import moment from "moment";
import "./style.css";
import userEvent from "@testing-library/user-event";

const Mv = (props) => {
  const mvId = props.mv;
  const [mvUrl, setMvUrl] = useState(undefined);
  const [mvDetail, setMvDetail] = useState(undefined);
  const [simiMvs, setSimiMvs] = useState(undefined);
  const [hotComments, setHotComments] = useState(undefined);
  useEffect(() => {
    Axios.get(`/api/mv/url?id=${mvId}`).then(({ data }) => {
      if (data.code === 200) {
        setMvUrl(data.data.url);
      }
    });
    Axios.get(`/api/mv/detail?mvid=${mvId}`).then(({ data }) => {
      if (data.code === 200) {
        setMvDetail(data.data);
      }
    });
    Axios.get(`/api/simi/mv?mvid=${mvId}`).then(({ data }) => {
      if (data.code === 200) {
        setSimiMvs(data.mvs);
      }
    });
    Axios.get(`/api/comment/mv?id=${mvId}`).then(({ data }) => {
      console.log(data.hotComments);
      if (data.code === 200) {
        setHotComments(data.hotComments);
      }
    });
  }, [mvId]);
  return (
    <>
      <div className="mv-wrapper">
        {mvDetail !== undefined && mvUrl !== undefined ? (
          <div className="aMv">
            <div className="mv-info">
              <div className="mv-info-name">
                <h2>{mvDetail.name}</h2>
                <span>{mvDetail.artistName}</span>
              </div>
              <div className="mv-info-base">
                <p>发布时间:{mvDetail.publishTime}</p>
                <p>播放次数:{mvDetail.playCount}</p>
              </div>
            </div>
            <video
              className="video"
              autoPlay="autoplay"
              src={mvUrl}
              controls="controls"
            ></video>
          </div>
        ) : (
          "数据正在加载中..."
        )}

        <div className="simi-mvs-wrapper">
          <h2>相似MV</h2>
          <div className="simi-mvs">
            {simiMvs !== undefined
              ? simiMvs.map((item) => {
                  return (
                    <Link
                      to={`/mv?id=${item.id}`}
                      key={item.id}
                      onClick={() => {
                        props.handleSaveMvId(item.id);
                      }}
                    >
                      <div className="aSimiMv">
                        <div className="aSimiMv-img">
                          <img src={item.cover} width="100px" height="80px" />
                        </div>
                        <p>{item.name}</p>
                      </div>
                    </Link>
                  );
                })
              : "数据加载中..."}
          </div>
        </div>
      </div>
      <hr />
      <div>
        <h2>热门评论:</h2>
        {hotComments !== undefined ? (
          <div>
            {hotComments.map((item) => {
              return (
                <Comment
                  key={item.commentId}
                  author={<a>{item.user.nickname}</a>}
                  avatar={
                    <Avatar
                      src={item.user.avatarUrl}
                      alt={item.user.nickname}
                    />
                  }
                  content={<p>{item.content}</p>}
                  datetime={
                    <Tooltip title={moment(item.time).format("YYYY-MM-DD")}>
                      <span>{moment(item.time).format("YYYY-MM-DD")}</span>
                    </Tooltip>
                  }
                />
              );
            })}
          </div>
        ) : (
          "评论正在赶来的路上..."
        )}
      </div>
    </>
  );
};

export default Mv;
