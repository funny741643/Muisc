import {
  SAVE_PLAYLIST_STATE,
  SAVE_PLAY_ID,
  SAVE_PLAYLIST_ID,
} from "../../components/constant";

const initialState = {
  playlist: [],
  playlistId: undefined,
  playId: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SAVE_PLAYLIST_STATE:
      let playlist = action.data;
      return { ...state, playlist };
    case SAVE_PLAY_ID:
      let playId = action.data;
      return { ...state, playId };
    case SAVE_PLAYLIST_ID:
      let playlistId = action.data;
      return { ...state, playlistId };
    default:
      return state;
  }
};
