import { SAVE_MV_ID } from "../../components/constant";

export default (state = {}, action) => {
  switch (action.type) {
    case SAVE_MV_ID:
      return action.data;
    default:
      return state;
  }
};
