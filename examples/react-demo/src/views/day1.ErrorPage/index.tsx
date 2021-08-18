import {Link, Route, Switch} from 'react-router-dom'
import React from "react";
import Error1 from './ErrorPage1'
import MyExamples from './myExamples'
import './index.less'

export function ErrorPage() {
    return <div>
        <div>
            <nav>
                <Link className="link" to="/errorPage/Error1">官方轮子</Link>
            </nav>
            <nav>
                <Link to="/errorPage/MyExamples">我的轮子例子</Link>
            </nav>
        </div>
        <Switch>
            <Route exact path="/errorPage/Error1">
                <Error1/>
            </Route>
            <Route path="/errorPage/MyExamples">
                <MyExamples/>
            </Route>
        </Switch>
    </div>
}

export default ErrorPage
