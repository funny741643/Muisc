import { connect } from "react-redux";
import Singerlist from "../Discover/Singerlist/index";
import createAction from "../../redux/action";
import { SAVE_SINGER_ID } from "../constant";

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleSaveSingerId: (data) => {
      dispatch(createAction(SAVE_SINGER_ID, data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Singerlist);
