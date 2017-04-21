import { createStore } from 'redux'
import todoApp from './reducers'
import { throttle } from 'lodash'

const logger = (store) => (next) => {
  if (!console.group) {
    return next
  }
  // This means addLoggingToDispatch is a curried function
  return (action) => {
    console.group(action.type)
    console.log('%c previous state: ', 'color: gray', store.getState())
    console.log('%c action: ', 'color: blue', action)
    const returnValue = next(action) // Dispatch: Hey I am here!
    console.log('%c next state: ', 'color: green', store.getState())
    console.groupEnd(action.type)
    return returnValue
  }
}

// Same trick as we did in addLoggingToDispatch
const promise = (store) => (next) => (action) => {
  if (typeof action.then === 'function') {
    return action.then(rawDispatch)
  }
  return next(action)
}

const wrapDispatchWithMiddleWares = (store, middlewares) => {
  // however we must reverse the executing order
  middlewares.slice().reverse().forEach(middleware =>
    store.dispatch = middleware(store)(store.dispatch)
  )
}

const configureStore = () => {
  const store = createStore(todoApp)
  // The purpose of the middlewares is to replace 
  // the single dispatch function with a chain of
  // composable dispatch functions which each can do something with an action.
  const middlewares = []
  // specify the order in which the action propagates through the middlewares.
  // Propagation order: recognize promise => log info 
  middlewares.push(promise)

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger)
  }
  wrapDispatchWithMiddleWares(store, middlewares)
  return store
}

export default configureStore
