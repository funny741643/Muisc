import { SAVE_SINGER_ID } from "../../components/constant";

export default (state = {}, action) => {
  switch (action.type) {
    case SAVE_SINGER_ID:
      return action.data;
    default:
      return state;
  }
};
