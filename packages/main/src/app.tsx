import * as React from 'react';
// @ts-ignore
import Routers, {routes, IRoute} from './router'
import {
    HashRouter as Router,
    NavLink
} from "react-router-dom";
import "./App.less"

function App() {
    return (
        <div className="App" style={{width: '100%', height: '100%'}}>
            <Router>
                <nav>
                    <ul className="nav_list">
                        {
                            routes.map((lk: IRoute, index: number) => {
                                return <li key={index}>
                                    <NavLink activeStyle={{
                                        fontWeight: "bold",
                                        color: "red"
                                    }} to={lk.path}>{lk.title}</NavLink>
                                </li>
                            })
                        }
                    </ul>
                </nav>
                <Routers/>
            </Router>
        </div>
    );
}

export default App;
