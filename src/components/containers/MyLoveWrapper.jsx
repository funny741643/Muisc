import { connect } from "react-redux";
import MyLove from "../MyLove";
import createAction from "../../redux/action";
import { SAVE_SINGER_ID, SAVE_PLAY_ID } from "../constant";

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleSavePlayId: (data) => {
      dispatch(createAction(SAVE_PLAY_ID, data));
    },
    handleSaveSingerId: (data) => {
      dispatch(createAction(SAVE_SINGER_ID, data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyLove);
