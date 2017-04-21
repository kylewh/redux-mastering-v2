import { combineReducers } from 'redux'

const byId = (state = {}, action) => {
  switch (action.type) {
    case 'RECEIVE_TODOS':
      const nextState = { ...state }
      action.response.forEach(todo =>
        nextState[todo.id] = todo
      )
      return nextState
    default:
      return state
  }
}

const allIds = (state = [], action) => {
  if ( action.filter !== 'all') {
    return state
  }
  switch (action.type) {
    case 'RECEIVE_TODOS':
      return action.response.map(todo => todo.id)
    default:
      return state
  }
}

const activeIds = (state = [], action) => {
    if ( action.filter !== 'active') {
      return state
    }
    switch (action.type) {
      case 'RECEIVE_TODOS':
        return action.response.map(todo => todo.id)
      default:
        return state
    }
}

const completedIds = (state = [], action) => {
    if ( action.filter !== 'completed') {
      return state
    }
    switch (action.type) {
      case 'RECEIVE_TODOS':
        return action.response.map(todo => todo.id)
      default:
        return state
    }
}

// as mentioned before, we have this reducer with 3 child reducers
const idsByFilter = combineReducers({
  all: allIds,
  active: activeIds,
  completed: completedIds
})

const todos = combineReducers({
  byId,
  idsByFilter
})

export default todos
/**
 * ================= IMPORTANT =================
 * Convention:
 * The default export is always the reducer function,
 * but any named export starting with get is a function that
 * prepares the data to be displayed by the UI.
 * We usually call these functions selectors
 * because they select something from the current state.
 */

export const getVisibleTodos = (state, filter) => {
  const ids = state.idsByFilter[filter]
  return ids.map(id => state.byId[id])
}
