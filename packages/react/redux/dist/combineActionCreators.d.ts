declare const combineActionCreators: (actionCreators: ActionCreator<any> | ActionCreatorsMapObject, dispatch: Dispatch) => ActionCreatorsMapObject<any, any[]> | ((this: any, ...args: any[]) => any);
export default combineActionCreators;
