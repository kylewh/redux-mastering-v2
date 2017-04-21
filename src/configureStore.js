import { createStore, applyMiddleware } from 'redux'
import promise from 'redux-promise'
import { createLogger } from 'redux-logger'
import todoApp from './reducers'

const configureStore = () => {
  // The purpose of the middlewares is to replace 
  // the single dispatch function with a chain of
  // composable dispatch functions which each can do something with an action.
  const middlewares = []
  // specify the order in which the action propagates through the middlewares.
  // Propagation order: recognize promise => log info 
  middlewares.push(promise)

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger())
  }

  // The last arguments of createStore called enhancer --optional
  return createStore(
    todoApp,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(...middlewares)
  )
}

export default configureStore
