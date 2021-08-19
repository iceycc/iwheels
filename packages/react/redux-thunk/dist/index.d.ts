export default thunkMiddleware;
declare function thunkMiddleware({ dispatch, getState }: {
    dispatch: any;
    getState: any;
}): (next: any) => (action: any) => any;
declare namespace thunkMiddleware {
    export { createThunkMiddleware as withExtraArgument };
}
declare function createThunkMiddleware(extraArgs: any): ({ dispatch, getState }: {
    dispatch: any;
    getState: any;
}) => (next: any) => (action: any) => any;
