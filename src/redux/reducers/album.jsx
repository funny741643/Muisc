import { SAVE_ALBUM_STATE } from "../../components/constant";

export default (state = {}, action) => {
  switch (action.type) {
    case SAVE_ALBUM_STATE:
      return action.data;
    default:
      return state;
  }
};
