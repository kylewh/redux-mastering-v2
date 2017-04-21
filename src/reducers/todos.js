import { combineReducers } from 'redux'
import todo from './todo'

/**
 * Line 12: Replace the todo with the previouse one
 * Line 15: Computed property syntax, which lets us specify a 
 *          value at a dynamic key inside action.id
 */
const byId = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_TODO':
    case 'TOGGLE_TODO':
      return {
        ...state,
        [action.id]: todo(state[action.id], action)
      }
    default:
      return state
  }
}

const allIds = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, action.id]
    default:
      return state
  }
}

const todos = combineReducers({
  byId,
  allIds
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

/**
 * Due to we changed the todos' state shape
 * we have to make another selector to specify the todos.
 * we treat our state as a database :
 * 1. we create a lookup table which store id of all item
 * 2. we using lookup table to map todoItems we want
 * 
 * Here getAllTodos map all todoItems. 
 */

const getAllTodos = (state) =>
  state.allIds.map(id => state.byId[id])

export const getVisibleTodos = (state, filter) => {
  const allTodos = getAllTodos(state)
  switch (filter) {
    case 'all':
      return allTodos
    case 'completed':
      return allTodos.filter(t => t.completed)
    case 'active':
      return allTodos.filter(t => !t.completed)
    default:
      throw new Error(`Unknown filter: ${filter}.`)
  }
}
