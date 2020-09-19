import { connect } from "react-redux";
import NewSongs from "../Discover/Recommend/NewSongs";
import createAction from "../../redux/action";
import { SAVE_PLAY_ID } from "../constant";

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleSavePlayId: (data) => {
      dispatch(createAction(SAVE_PLAY_ID, data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewSongs);
