import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoApp from './reducers'
import App from './components/App'
import { loadState, saveState } from './loadState'
import { throttle } from 'lodash'

const persistedState = loadState()

// In root Reducer the visibilityFilter will fall back to 'SHOW_ALL'

/**
 * createStore allow second argumenrs for persistedState
 * Whatever value we pass to createStore as a second argument 
 * is going to end up in the root reducer as the state argument instead of undefined
 */

const store = createStore(
  todoApp,
  persistedState
)

/**
 * Once our state is changed,
 * We will pass the newest state into localStorage
 */

/**
 * Prevent saveState to be called too much time,
 * in case of adding items very frequently.
 * 
 */
store.subscribe( throttle(() => {
  saveState({
    todos:store.getState().todos
  })
}, 1000))

// We will noticed that filter state is also kept and UI won't fall
// back to the default filter (All)
// so, instead of passing whole state we just pass todos.

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
