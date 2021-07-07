import * as React from 'react';
// @ts-ignore
import Routers, {routes, IRoute} from './router'
import {
    HashRouter as Router,
    NavLink
} from "react-router-dom";
import './style/normalize.css'
import "./App.less"
import {Button} from 'antd'

function App() {
    const style = {
        ul: {
            display: 'flex'
        },
        li: {}
    }
    return (
        <div className="App" style={{width: '100%', height: '100%'}}>
            <Router>
                <ul style={style.ul}>
                    {
                        routes.map((lk: IRoute, index: number) => {
                            return <li key={index}>
                                <NavLink activeClassName="active"
                                         to={lk.path}><Button>{lk.title}</Button></NavLink>
                            </li>
                        })
                    }
                </ul>
                <Routers/>
            </Router>
        </div>
    );
}

export default App;
