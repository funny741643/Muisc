import Discover from "../Discover";
import MyLove from "../containers/MyLoveWrapper";
import Playlist from "../containers/playlistWrapper";
import Album from "../containers/AlbumWrapper";
import Singer from "../containers/SingerWrapper";
import Mv from "../containers/MvWrapper";

export const routerConfig = [
  {
    path: "/discover",
    component: Discover,
    key: 100,
  },
  {
    path: "/mylove",
    component: MyLove,
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
  {
    path: "/singer",
    component: Singer,
    exact: false,
    key: 104,
  },
  {
    path: "/mv",
    component: Mv,
    exact: false,
    key: 105,
  },
];
