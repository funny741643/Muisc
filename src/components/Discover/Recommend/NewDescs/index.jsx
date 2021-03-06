import React from "react";
import SlideWindow from "../../../containers/SlideWindowWrapper";

const NewDescs = (props) => {
  return (
    <div className="newdisc_wrapper">
      <h2>新碟上架</h2>
      <SlideWindow sourceData={props.data} />
    </div>
  );
};

export default NewDescs;
