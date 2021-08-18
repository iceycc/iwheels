// 出错后显示的元素类型
import React from "react";

// 出错后显示的元素类型
type FallbackElement = React.ReactElement<unknown, string | React.FC | typeof React.Component> | null;

// 出错显示组件的 props
export interface FallbackProps {
    error: Error;
    resetErrorBoundary: () => void; // fallback 组件里将该函数绑定到“重置”按钮
}

export declare function FallbackRender(props: FallbackProps): FallbackElement;

type FallbackComponent = React.ComponentType<FallbackProps>; // Fallback 组件

// 本组件 ErrorBoundary 的 props
interface ErrorBoundaryProps {
    fallback?: FallbackElement;
    fallbackRender?: typeof FallbackRender;
    FallbackComponent?: FallbackComponent;
    onError?: (error: Error, info: { componentStack: string }) => void;
    onReset?: () => void; // 开发者自定义重置逻辑，如日志上报、 toast 提示
    resetKeys?: Array<unknown>;
    onResetKeysChange?: (prevResetkey: Array<unknown> | undefined, resetKeys: Array<unknown> | undefined) => void;
}

// 本组件 ErrorBoundary 的 props
interface ErrorBoundaryState {
    error: Error | null; // 将 hasError 的 boolean 改为 Error 类型，提供更丰富的报错信息
}

// 初始状态
const initialState: ErrorBoundaryState = {
    error: null,
}

/**
 *  检查 resetKeys 是否有变化
 * @param a
 * @param b
 */
const changedArray = (a: Array<unknown> = [], b: Array<unknown> = []) => {
    return a.length !== b.length || a.some((item, index) => !Object.is(item, b[index]));
}

/**
 *
 */
export class ErrorBoundary extends React.Component<React.PropsWithChildren<ErrorBoundaryProps>, ErrorBoundaryState> {
    state = initialState;
    // 是否已经由于 error 而引发的 render/update
    updatedWithError = false;

    static getDerivedStateFromError(error: Error) {
        return {error};
    }


    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        if (this.props.onError) {
            this.props.onError(error, {componentStack: errorInfo.componentStack});
        }
    }

    componentDidUpdate(prevProps: Readonly<React.PropsWithChildren<ErrorBoundaryProps>>, prevState: Readonly<ErrorBoundaryState>, snapshot?: any) {
        const {error} = this.state;
        const {resetKeys, onResetKeysChange} = this.props
        // 已经存在错误，并且是第一次由于 error 而引发的 render/update，那么设置 flag=true，不会重置
        if (error !== null && !this.updatedWithError) {
            this.updatedWithError = true;
            return;
        }
        // 只要 resetKeys 有变化，直接 reset
        if (changedArray(prevProps.resetKeys, resetKeys)) {
            if (onResetKeysChange) {
                // 提供开发者对应的更新回调
                onResetKeysChange(prevProps.resetKeys, resetKeys)
            }
            // 重置 ErrorBoundary 状态，并调用 onReset 回调
            this.reset();
        }
    }

    reset = () => {
        this.updatedWithError = false;
        this.setState(initialState)
    }
    resetErrorBoundary = () => {
        if (this.props.onReset) {
            this.props.onReset();
        }
        this.reset();
    }

    render() {
        const {fallback, FallbackComponent, fallbackRender} = this.props;
        const {error} = this.state;

        if (error !== null) {
            const fallBackProps: FallbackProps = {
                error,
                resetErrorBoundary: this.resetErrorBoundary
            }
            // 判断 fallback 是否为合法的 Element
            if (React.isValidElement(fallback)) {
                return fallback;
            }
            // 判断 render 是否为函数
            if (typeof fallbackRender === 'function') {
                return (fallbackRender as typeof FallbackRender)(fallBackProps);
            }
            // 判断是否存在 FallbackComponent
            if (FallbackComponent) {
                return <FallbackComponent {...fallBackProps}/>
            }
            throw new Error('ErrorBoundary 组件需要传入 fallback, fallbackRender, FallbackComponent 其中一个');
        }

        return this.props.children;
    }
}

/**
 *
 * @param Component
 * @param errorBoundaryProps
 */
export function withErrorBoundary<P>(Component: React.ComponentType<P>, errorBoundaryProps: ErrorBoundaryProps): React.ComponentType<P> {
    const WrappedComponent: React.ComponentType<P> = props => {
        return (
            <ErrorBoundary {...errorBoundaryProps}>
                <Component {...props}/>
            </ErrorBoundary>
        )
    }
    const name = Component.displayName || Component.name || 'Unknown';
    WrappedComponent.displayName = `withErrorBoundary(${WrappedComponent})`
    return WrappedComponent;
}


/**
 * 自定义错误的 handler
 * @param givenError
 */
export function useErrorHandler<P = Error>(
    givenError?: P | null | undefined,
): React.Dispatch<React.SetStateAction<P | null>> {
    const [error, setError] = React.useState<P | null>(null);
    if (givenError) throw givenError; // 初始有错误时，直接抛出
    if (error) throw error; // 后来再有错误，也直接抛出
    return setError; // 返回开发者可手动设置错误的钩子
}
