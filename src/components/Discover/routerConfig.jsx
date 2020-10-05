import Recommend from "./Recommend";
import Songlist from "./Songlist";
import Singerlist from "../../components/containers/SingerlistWrapper";
import Ranklist from "../../components/containers/RanklistWrapper";

export const routerConfig = [
  {
    path: "/discover",
    component: Recommend,
    exact: true,
    key: 300,
  },
  {
    path: "/discover/songlist",
    component: Songlist,
    exact: true,
    key: 301,
  },
  {
    path: "/discover/ranklist",
    component: Ranklist,
    exact: true,
    key: 302,
  },
  {
    path: "/discover/singerlist",
    component: Singerlist,
    exact: true,
    key: 303,
  },
];
