/**
 * 自己封装React-Router映射
 */
import {
    Switch,
    Route,
} from "react-router-dom"
import * as React from "react";
import ErrorPage from '../views/day1.ErrorPage/index'
import IdbZkeyval from '../views/IdbZkeyval/index'
// 自动导入module下所有模块
// @ts-ignore
// const context = require.context('../views', false, /\.tsx$/)
// const modules = (modulesFiles => {
//     return modulesFiles.keys().reduce((modules: { [x: string]: any; }, modulePath: string) => {
//         const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
//         const value = modulesFiles(modulePath);
//         modules[moduleName] = value.default;
//         return modules;
//     }, {});
// })(context);
// console.log(modules)
export interface IRoute {
    path: string
    name: string
    meta?: Record<any, any>
    component?: any
    routes?: IRoute[]
    title?: string
}

export const routes: IRoute[] = [
    {
        path: '/errorPage',
        name: 'ErrorPage',
        component: ErrorPage,
        title: 'react-error-boundary轮子'
    },
    {
        path: '/idbZkeyval',
        name: 'IdbZkeyval',
        component: IdbZkeyval,
        title: 'idb-keyval轮子'
    },
]

export default function Routers() {
    function RouteWithSubRoutes(route: IRoute) {
        return (
            <Route
                path={route.path}
                render={props => {
                    const Com = route.component
                    // pass the sub-routes down to keep nesting
                    // @ts-ignore todo
                    return <Com {...props} routes={route.routes}/>
                }
                }
            />
        );
    }

    return <>
        <Switch>
            {routes.map((route, i) => (
                <RouteWithSubRoutes key={i} {...route} />
            ))}
        </Switch>
    </>
}
