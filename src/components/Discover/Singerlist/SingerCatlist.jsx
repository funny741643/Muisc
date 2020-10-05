import React, { useState } from "react";
import { Radio } from "antd";

import "./style.css";

const SingerCatlist = (props) => {
  const { area, type, letter } = props.sourceData;
  const { getClassify } = props;
  const handleChange = (e) => {
    getClassify(e.target.name, e.target.value);
  };

  return (
    <div className="singer-catlist-wrapper">
      <div className="catlist-classify">
        <h2 className="tag-name">语种:</h2>
        <Radio.Group
          defaultValue="全部"
          buttonStyle="solid"
          name="area"
          onChange={handleChange}
        >
          {area.map((item, index) => {
            return (
              <Radio.Button className="radio-button" value={item} key={index}>
                {item}
              </Radio.Button>
            );
          })}
        </Radio.Group>
      </div>

      <div className="catlist-classify">
        <h2 className="tag-name">分类:</h2>
        <Radio.Group
          defaultValue="全部"
          buttonStyle="solid"
          name="catlist"
          onChange={handleChange}
        >
          {type.map((item, index) => {
            return (
              <Radio.Button className="radio-button" key={index} value={item}>
                {item}
              </Radio.Button>
            );
          })}
        </Radio.Group>
      </div>

      <div className="catlist-classify">
        <h2 className="tag-name">筛选:</h2>
        <Radio.Group
          defaultValue="热门"
          buttonStyle="solid"
          name="letter"
          onChange={handleChange}
        >
          {letter.map((item, index) => {
            return (
              <Radio.Button className="radio-button" key={index} value={item}>
                {item}
              </Radio.Button>
            );
          })}
        </Radio.Group>
      </div>
      <hr />
    </div>
  );
};

export default SingerCatlist;
