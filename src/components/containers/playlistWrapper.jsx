import { connect } from "react-redux";
import Playlist from "../Playlist";
import createAction from "../../redux/action";
import { SAVE_PLAYLIST_STATE, SAVE_PLAYLIST_ID } from "../constant";

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleSave: (data) => {
      dispatch(createAction(SAVE_PLAYLIST_STATE, data));
    },
    handleSavePlaylistId: (data) => {
      dispatch(createAction(SAVE_PLAYLIST_ID, data))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
