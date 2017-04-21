import { createStore } from 'redux'
import todoApp from './reducers'
import { throttle } from 'lodash'

const addLoggingToDispatch = (store) => {
  const rawDispatch = store.dispatch

  if (!console.group) {
    return rawDispatch
  }
  /**
   * Here we do the wrapping
   * As same as the original dispatch,
   * It also receive an action as arguments,
   * then return back the state.
   */
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

const configureStore = () => {
  const store = createStore(todoApp)

  if (process.env.NODE_ENV !== 'production') {
    store.dispatch = addLoggingToDispatch(store)
  }

  store.subscribe(throttle(() => {
    saveState({
      todos: store.getState().todos
    })
  }, 1000))

  return store
}

export default configureStore
