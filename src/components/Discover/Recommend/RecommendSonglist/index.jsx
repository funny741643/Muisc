import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const RecommendSonglist = (props) => {
  const { creatives, uiElement } = props.data;
  return (
    <div>
      <h2>{uiElement.mainTitle.title}</h2>
      <div className="recommend-songlist">
        {creatives.map((item) => {
          const { uiElement } = item;
          return (
            <Link
              to={`/playlist/?id=${item.creativeId}`}
              className="songlist-item"
              key={item.creativeId}
            >
              <div>
                <img
                  src={uiElement.image.imageUrl}
                  width="150px"
                  height="150px"
                />
                <h3>{uiElement.mainTitle.title}</h3>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default RecommendSonglist;
