import Recommend from './Recommend'
import Songlist from './Songlist'


export const routerConfig = [
    {
        path: "/discover",
        component: Recommend,
        exact: true,
        key: 300
    },
    {
        path: "/discover/songlist",
        component: Songlist,
        exact: true,
        key: 301
    }
]