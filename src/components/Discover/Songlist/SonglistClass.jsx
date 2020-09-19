import React, { useState } from "react";
import { Radio } from "antd";
import { withRouter } from "react-router-dom";

const SonglistClass = (props) => {
  let { categories, sub } = props.sourceData;
  let { resetPage, getClassname } = props;
  const [nowClass, setNowClass] = useState(undefined);
  const handleChangeClass = (e) => {
    setNowClass(e.target.value);
    getClassname(e.target.value);
    resetPage(1);
  };
  return (
    <>
      {Object.keys(categories).map((i) => {
        return (
          <div key={i}>
            <h2>{categories[i]}</h2>
            <Radio.Group value={nowClass} onChange={handleChangeClass}>
              {sub.map((item, index) => {
                if (item.category.toString() === i) {
                  return (
                    <Radio.Button
                      value={item.name}
                      key={index}
                      style={{ marginBottom: "10px" }}
                    >
                      {item.name}
                    </Radio.Button>
                  );
                }
              })}
            </Radio.Group>
          </div>
        );
      })}
    </>
  );
};

export default withRouter(SonglistClass);
