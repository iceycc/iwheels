import React,{useEffect} from 'react';
import "./app.less"
// @ts-ignore
import {ErrorBoundary, InfiniteScroller} from "for-react"

const MakeError = () => {
    useEffect(() => {
        const number = Math.random();
        if (number > 0.5) {
            throw new Error('大于0.5');
        }
    }, []);

    return <div>正常</div>
}

function App() {
    return (
        <div className="App">
            <ErrorBoundary fallback={<div>出错啦</div>}>
                <MakeError/>
            </ErrorBoundary>
            <InfiniteScroller/>
        </div>
    );
}

export default App;
