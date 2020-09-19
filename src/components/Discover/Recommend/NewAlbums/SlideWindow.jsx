import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import "./style.css";

class SlideWindow extends Component {
  state = {
    sourceData: undefined,
    turnStyle: { transform: "translate(0px)" },
  };
  constructor(props) {
    super(props);
    this.galleryRef = React.createRef();
    this.handleTurn = this.handleTurn.bind(this);
  }
  componentDidMount() {
    this.setState({
      sourceData: this.props.sourceData,
    });
  }
  handleTurn(e) {
    if (e.target.name === "right") {
      this.setState({
        turnStyle: { transform: "translate(-1360px)" },
      });
    } else {
      this.setState({
        turnStyle: { transform: "translate(0px)" },
      });
    }
  }
  render() {
    return (
      <div className="newdisc-gallery-wrapper">
        <div
          className="newdisc-gallery"
          ref={this.galleryRef}
          style={this.state.turnStyle}
        >
          {this.state.sourceData !== undefined
            ? this.state.sourceData.map((item) => {
                return (
                  <Link
                    to={`/album/id=${item.id}`}
                    key={item.id}
                    onClick={() => {
                      this.props.handleSaveAlbum(item);
                    }}
                  >
                    <div className="newdisc-gallery-item">
                      <div className="newdisc-gallery-item-image">
                        <img src={item.picUrl} width="300px" height="300px" />
                      </div>

                      <div className="newdisc-gallery-item-info">
                        <p>{item.name}</p>
                        <p>{item.artist.name}</p>
                      </div>
                    </div>
                  </Link>
                );
              })
            : "数据加载中..."}
        </div>

        <Button
          className="slide-window-left-button"
          icon={<LeftOutlined />}
          size="middle"
          onClick={this.handleTurn}
          name="left"
        />
        <Button
          className="slide-window-right-button"
          icon={<RightOutlined />}
          size="middle"
          onClick={this.handleTurn}
          name="right"
        />
      </div>
    );
  }
}

export default SlideWindow;
