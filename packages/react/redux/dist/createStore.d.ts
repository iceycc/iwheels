declare function createStore<S, A extends Action>(reducer: Reducer<S, A>, preloadedState: any, enhancer?: Function): any;
export default createStore;
