declare function applyMiddlewares(...middlewares: Middleware[]): (createStore: any) => (reducer: Reducer, preloadState: any) => any;
export default applyMiddlewares;
