import { createStore } from 'redux'
import todoApp from './reducers'
import { throttle } from 'lodash'

const addLoggingToDispatch = (store) => {
  const rawDispatch = store.dispatch
  if (!console.group) {
    return rawDispatch
  }

  return (action) => {
    console.group(action.type)
    console.log('%c previous state: ', 'color: gray', store.getState())
    console.log('%c action: ', 'color: blue', action)
    const returnValue = rawDispatch(action) // Dispatch: Hey I am here!
    console.log('%c next state: ','color: green', store.getState())
    console.groupEnd(action.type)
    return returnValue
  }
}

// Same trick as we did in addLoggingToDispatch
const addPromiseSupportToDispatch = (store) => {
  const rawDispatch = store.dispatch
  return (action) => {
    // Key Step: Recognize promise
    if (typeof action.then === 'function') {
      // rawDispatch will receive an action object as 
      // fullfilled value which is returned by receiveTodos
      // Then rawDispatch as the resolve function will be executed
      // Hence we indirectly update the state
      return action.then(rawDispatch)
    }
    return rawDispatch(action)
  }
}

const configureStore = () => {
  const store = createStore(todoApp)

  if (process.env.NODE_ENV !== 'production') {
    store.dispatch = addLoggingToDispatch(store)
  }

  store.dispatch = addPromiseSupportToDispatch(store)

  return store
}

export default configureStore
