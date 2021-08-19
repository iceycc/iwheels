import React, {useState} from 'react';
import {ErrorBoundary} from "../../lib";
import MakeError from '../Error/MakeError';
import {ErrorFallback} from '../utils';

const FallbackExample = ({name=''}) => {
    const [retry, setRetry] = useState<number>(0);

    return (
        <div>
            <button onClick={() => setRetry(retry + 1)}>retry</button>

            <ErrorBoundary
                FallbackComponent={ErrorFallback}
                resetKeys={[retry]}
            >
                <MakeError name={name}/>
            </ErrorBoundary>
        </div>
    )
};

export default FallbackExample;
