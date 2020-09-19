import Discover from "../Discover";
import MyFM from "../MyFM";
// import Playlist from "../Playlist";
import Playlist from "../containers/playlistWrapper";
import Album from "../containers/AlbumWrapper";

export const routerConfig = [
  {
    path: "/discover",
    component: Discover,
    key: 100,
  },
  {
    path: "/myfm",
    component: MyFM,
    key: 101,
  },
  {
    path: "/playlist",
    component: Playlist,
    exact: false,
    key: 102,
  },
  {
    path: "/album",
    component: Album,
    exact: false,
    key: 103,
  },
];
