import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Body from "./Body";
import Footer from "../containers/FooterWrapper";
import "./style.css";
import { routerConfig } from "./routerConfig";

const Comment = () => {
  return (
    <div>
      <Header />
      <div className="main">
        <Sidebar></Sidebar>
        <Body config={routerConfig}></Body>
      </div>
      <Footer />
    </div>
  );
};

export default Comment;
