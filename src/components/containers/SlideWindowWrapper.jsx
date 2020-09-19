import { connect } from "react-redux";
import SlideWindow from '../Discover/Recommend/NewAlbums/SlideWindow'
import createAction from "../../redux/action";
import { SAVE_ALBUM_STATE } from "../constant";

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleSaveAlbum: (data) => {
      dispatch(createAction(SAVE_ALBUM_STATE, data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SlideWindow);
