import React, {useState} from 'react';
import MakeError from '../Error/MakeError';
import {ErrorFallback} from '../utils';
import {ErrorBoundary} from "@iwheels/react-error-boundary";

const FallbackComponentExample = ({name = ''}) => {
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
            {!hasError ? <MakeError name={name}/> : null}
        </ErrorBoundary>
    )
};

export default FallbackComponentExample;
