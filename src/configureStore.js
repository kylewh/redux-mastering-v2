import { createStore, applyMiddleware } from 'redux'
// import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import todoApp from './reducers'

const thunk = (store) => (next) => (action) =>
  typeof action === 'function' ?
    action(store.dispatch) :
    next(action)
    
const configureStore = () => {
  const middlewares = []
  middlewares.push(thunk)

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger())
  }

  return createStore(
    todoApp,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(...middlewares)
  )
}

export default configureStore
