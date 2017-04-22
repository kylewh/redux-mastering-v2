import { combineReducers } from 'redux'

const createList = (filter) => {
  
  const handleToggle = (state, action) => {
    const { result: toggledId, entities } = action.response
    const { completed } = entities.todos[toggledId]
    const shouldRemove = (
      (completed && filter === 'active') ||
      (!completed && filter === 'completed')
    )
    return shouldRemove ?
      state.filter(id => id !== toggledId) :
      state
  }

  const ids = (state = [], action) => {

    switch (action.type) {
      case 'FETCH_TODOS_SUCCESS':
        return filter === action.filter ?
          action.response.result :
          state
      case 'ADD_TODOS_SUCCESS':
        return filter !== 'completed' ?
          [...state, action.response.result] :
          state
      case 'TOGGLE_TODO_SUCCESS':
        return handleToggle(state, action)
      default:
        return state
    }
  }

  const isFecthing = (state = false, action) => {
    if (action.filter !== filter) {
      return state
    }
    switch (action.type) {
      case 'FETCH_TODOS_REQUEST':
        return true
      case 'FETCH_TODOS_SUCCESS':
      case 'FETCH_TODOS_FAILURE':
        return false
      default:
        return state
    }
  }

  const errorMessage = (state = null, action) => {
    if (action.filter !== filter) {
      return state
    }
    switch (action.type) {
      case 'FETCH_TODOS_FAILURE':
        return action.message
      case 'FETCH_TODOS_REQUEST':
      case 'FETCH_TODOS_FAILURE':
        return null
      default:
        return state
    }
  }

  return combineReducers({
    ids,
    isFecthing,
    errorMessage
  })
}

export default createList

export const getIds = (state) => state.ids

export const getIsFecthing = (state) => state.isFecthing

export const getErrorMessage = (state) => state.errorMessage
