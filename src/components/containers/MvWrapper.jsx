import { connect } from "react-redux";
import Mv from "../Mv";
import createAction from "../../redux/action";
import { SAVE_MV_ID } from "../constant";

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleSaveMvId: (data) => {
      dispatch(createAction(SAVE_MV_ID, data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Mv);
