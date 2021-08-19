import React, {useState} from 'react';
import {ErrorBoundary} from "../../lib";
import {ErrorFallback} from '../utils';
import AsyncError from '../Error/AsyncError';

const UseErrorHandlerExample = ({name=''}) => {
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
            FallbackComponent={ErrorFallback}
            onError={onError}
            onReset={onReset}
        >
            {!hasError ? <AsyncError name={name}/> : null}
        </ErrorBoundary>
    )
};

export default UseErrorHandlerExample;
