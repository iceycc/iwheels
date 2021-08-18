import React, {useEffect, useState} from 'react';
// @ts-ignore
// import {ErrorBoundary, withErrorBoundary,useErrorHandler} from "@iwheels/for-react"
import {ErrorBoundary, withErrorBoundary} from 'react-error-boundary'


// @ts-ignore
function ErrorFallback({error, resetErrorBoundary}) {
    return (
        <div role="alert">
            <p>有些错误：</p>
            <pre>{error.message}</pre>
            <button onClick={resetErrorBoundary}>重试一下</button>
        </div>
    )
}

function Example1() {
    const [flag, setFlag] = useState(false)
    const MakeError = () => {
        useEffect(() => {
            if (!flag) {
                throw new Error('组件一抱错了：Flag错误了');
            }
        }, []);
        return <div>组件一正常</div>
    }
    return <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => {
            setFlag(true)
        }}
        onError={(error: Error, info: { componentStack: string }) => {
            console.log('出错了啊', error.message, info.componentStack)
            // todo
            // 可以上传日志
        }}
    >
        <MakeError/>
    </ErrorBoundary>
}

function Example2() {
    const [number, setNumber] = useState(Math.random())
    const MakeError2 = () => {
        useEffect(() => {
            if (number > 0.5) {
                throw new Error('组件2抱错了：大于0.5');
            }
        }, []);
        return <div>组件二正常</div>
    }
    // 高阶组件写法
    const Common = withErrorBoundary(MakeError2, {
        FallbackComponent: ErrorFallback,
        onReset: () => {
            setNumber(0)
        }
    })
    console.log(Common.displayName)
    return <Common/>

}

function ErrorPage1() {
    const style = {
        li: {
            padding: '20px', border: '1px solid #666'
        }
    }
    return (
        <ul>
            <li style={style.li}>
                <Example1/>
            </li>
            <li style={style.li}>
                <Example2/>
            </li>
        </ul>
    );
}

export default ErrorPage1;
