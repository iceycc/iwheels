interface Action<T = any> {
    type: T
}

interface AnyAction extends Action {
    [extraProps: string]: any
}

interface ActionCreator<A, P extends any[] = any[]> {
    (...args: P): A
}

type Reducer<S = any, A extends Action = AnyAction> = (state: S | undefined, action: A) => S

interface Dispatch<A extends Action = AnyAction> {
    <T extends A>(action: T, ...extraArgs: any[]): T
}

interface MiddlewareAPI<D extends Dispatch = Dispatch, S = any> {
    dispatch: D

    getState(): S
}

interface Middleware<S = any, D extends Dispatch = Dispatch> {
    (api: MiddlewareAPI): (next: D) => (action: Action) => any
}

type ReducerMapObject<S = any, A extends Action = AnyAction> = {
    [K in keyof S]: Reducer<S, A>
}

interface ActionCreatorsMapObject<A = any, P extends any[] = any[]> {
    [key: string]: ActionCreator<A, P>
}

type Observer<V> = {
    next?: (value: V) => void
}
