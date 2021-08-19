import React, {useState} from 'react';
import {ErrorBoundary} from "../../lib";
import MakeError from '../Error/MakeError';

const FallbackExample = ({name=''}) => {
    const [hasError, setHasError] = useState(false);

    const onError = (error: Error) => {
        // 日志上報
        console.log(error);
        setHasError(true);
    }

    const onReset = () => {
        console.log('尝试恢复错误');
        setHasError(false);
    }

    return (
        <ErrorBoundary
            fallback={<div>出错啦</div>}
            onError={onError}
            onReset={onReset}
        >
            {!hasError ? <MakeError name={name}/> : null}
        </ErrorBoundary>
    )
};

export default FallbackExample;
