import actionTypes from "./utils/actionTypes";
import $$observable from "./utils/symbolObservable";
import isPlainObject from "./utils/isPlainObject";
import kindOf from "./utils/kindOf";

function createStore<S, A extends Action>(reducer: Reducer<S, A>, preloadedState, enhancer?: Function) {
  if (enhancer) {
    return enhancer(createStore)(reducer, preloadedState)
  }

  let currentState = preloadedState as S
  let currentReducer = reducer
  let currentListeners: (() => void)[] = []
  let nextListeners = currentListeners
  let isDispatching = false

  // 获取 state
  function getState() {
    if (isDispatching) {
      throw new Error('还在 dispatching 呢，获取不了 state 啊')
    }
    return currentState
  }

  // 分发 action 的函数
  function dispatch(action: A) {
    if (!isPlainObject(action)) {
      throw new Error(`不是纯净的 Object，是一个类似 ${kindOf(action)} 的东西`)
    }

    if (isDispatching) {
      throw new Error('还在 dispatching 呢，dispatch 不了啊')
    }

    try {
      isDispatching = true
      currentState = currentReducer(currentState, action)
    } finally {
      isDispatching = false
    }

    const listeners = (currentListeners = nextListeners)
    listeners.forEach(listener => listener())

    return action
  }

  // 将 nextListeners 作为临时 listeners 集合
  // 防止 dispatching 时出现的一些 bug
  function ensureCanMutateNextListeners() {
    if (nextListeners !== currentListeners) {
      nextListeners = currentListeners.slice()
    }
  }

  // 订阅
  function subscribe(listener: () => void) {
    if (isDispatching) {
      throw new Error('还在 dispatching 呢，subscribe 不了啊')
    }

    let isSubscribed = true

    ensureCanMutateNextListeners()
    nextListeners.push(listener)

    return function unsubscribe() {
      if (!isSubscribed) {
        return
      }

      if (isDispatching) {
        throw new Error('还在 dispatching 呢，unsubscribe 不了啊')
      }

      isSubscribed = false

      ensureCanMutateNextListeners()

      const index = nextListeners.indexOf(listener)
      nextListeners.splice(index, 1)
      currentListeners = []
    }
  }

  // 替换 reducer
  function replaceReducer<NewState, NewAction extends A>(nextReducer: Reducer<NewState, NewAction>) {
    ((currentReducer as unknown) as Reducer<NewState, NewAction>) = nextReducer

    dispatch({type: actionTypes.REPLACE} as A)

    return store
  }

  // 支持 observable/reactive 库
  function observable() {
    const outerSubscribe = subscribe

    return {
      subscribe(observer: unknown) {
        function observeState() {
          const observerAsObserver = observer as Observer<S>
          if (observerAsObserver.next) {
            observerAsObserver.next(getState())
          }
        }

        observeState() // 获取当前 state
        const unsubscribe = outerSubscribe(observeState)
        return {unsubscribe}
      },
      [$$observable]() {
        return this
      }
    }
  }

  // 初始化
  dispatch({type: actionTypes.INIT} as A)

  const store = {
    getState,
    dispatch,
    subscribe,
    replaceReducer,
    observable,
  }

  return store
}

export default createStore
