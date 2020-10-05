import { connect } from "react-redux";
import Ranklist from "../Discover/Ranklist";
import createAction from "../../redux/action";
import { SAVE_PLAY_ID, SAVE_PLAYLIST_ID, SAVE_PLAYLIST_STATE } from "../constant";

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleSavePlayId: (data) => {
      dispatch(createAction(SAVE_PLAY_ID, data));
    },
    handleSave: (data) => {
      dispatch(createAction(SAVE_PLAYLIST_STATE, data));
    },
    handleSavePlaylistId: (data) => {
      dispatch(createAction(SAVE_PLAYLIST_ID, data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Ranklist);
