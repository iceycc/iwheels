import React from 'react';
import {withErrorBoundary} from "../../lib"
import MakeError from '../Error/MakeError';
import {ErrorFallback} from '../utils';

const WithErrorBoundaryExample = withErrorBoundary(MakeError, {
    FallbackComponent: ErrorFallback,
    onError: (error, info) => console.log(error, info),
});

export default WithErrorBoundaryExample;
