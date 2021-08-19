import React from "react";
declare type FallbackElement = React.ReactElement<unknown, string | React.FC | typeof React.Component> | null;
export interface FallbackProps {
    error: Error;
    resetErrorBoundary: () => void;
}
export declare function FallbackRender(props: FallbackProps): FallbackElement;
declare type FallbackComponent = React.ComponentType<FallbackProps>;
interface ErrorBoundaryProps {
    fallback?: FallbackElement;
    fallbackRender?: typeof FallbackRender;
    FallbackComponent?: FallbackComponent;
    onError?: (error: Error, info: {
        componentStack: string;
    }) => void;
    onReset?: () => void;
    resetKeys?: Array<unknown>;
    onResetKeysChange?: (prevResetkey: Array<unknown> | undefined, resetKeys: Array<unknown> | undefined) => void;
}
interface ErrorBoundaryState {
    error: Error | null;
}
/**
 *
 */
export declare class ErrorBoundary extends React.Component<React.PropsWithChildren<ErrorBoundaryProps>, ErrorBoundaryState> {
    state: ErrorBoundaryState;
    updatedWithError: boolean;
    static getDerivedStateFromError(error: Error): {
        error: Error;
    };
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void;
    componentDidUpdate(prevProps: Readonly<React.PropsWithChildren<ErrorBoundaryProps>>, prevState: Readonly<ErrorBoundaryState>, snapshot?: any): void;
    reset: () => void;
    resetErrorBoundary: () => void;
    render(): {} | null | undefined;
}
/**
 *
 * @param Component
 * @param errorBoundaryProps
 */
export declare function withErrorBoundary<P>(Component: React.ComponentType<P>, errorBoundaryProps: ErrorBoundaryProps): React.ComponentType<P>;
/**
 * 自定义错误的 handler
 * @param givenError
 */
export declare function useErrorHandler<P = Error>(givenError?: P | null | undefined): React.Dispatch<React.SetStateAction<P | null>>;
export {};
