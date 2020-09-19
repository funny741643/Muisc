import { connect } from "react-redux";
import Footer from "../Comment/Footer";
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

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
