import React, {useState} from 'react';
import MakeError from '../Error/MakeError';
import {ErrorFallback} from '../utils';
import {ErrorBoundary} from '@iwheels/react-error-boundary';

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
