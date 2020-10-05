import { connect } from "react-redux";
import Singer from "../Singer";
import createAction from "../../redux/action";
import { SAVE_PLAY_ID, SAVE_ALBUM_STATE, SAVE_MV_ID } from "../constant";


const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleSavePlayId: (data) => {
      dispatch(createAction(SAVE_PLAY_ID, data));
    },
    handleSaveAlbum: (data) => {
      dispatch(createAction(SAVE_ALBUM_STATE, data));
    },
    handleSaveMvId: (data) => {
      dispatch(createAction(SAVE_MV_ID, data))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Singer);
// export default connect(mapStateToProps)(Singer);
