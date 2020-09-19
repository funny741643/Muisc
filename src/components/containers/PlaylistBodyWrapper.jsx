import { connect } from "react-redux";
import PlaylistBody from "../Playlist/PlaylistBody";
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

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistBody);
