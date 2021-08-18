/**
 * 自己封装React-Router映射
 */
import {
    Switch,
    Route,
} from "react-router-dom"
import * as React from "react";
import Day1Demo from '../views/day1.ErrorPage/index'
import Day2Demo from '../views/day2.IdbKeyval/index'
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
        path: '/ErrorPage',
        name: 'ErrorPage',
        component: Day1Demo,
        title: 'react-error-boundary轮子'
    },
    {
        path: '/IdbKeyval',
        name: 'IdbKeyval',
        component: Day2Demo,
        title: 'IdbKeyval轮子'
    }
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
