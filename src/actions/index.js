import { v4 } from 'node-uuid'
import * as api from '../api'
import { getIsFetching } from '../reducers'

const requestTodos = (filter) => ({
  type: 'REQUEST_TODOS',
  filter
})

const receiveTodos = (filter, response) => ({
  type: 'RECEIVE_TODOS',
  filter,
  response
})


export const fetchTodos = (filter) => (dispatch, getState) => {
  if (getIsFetching(getState(), filter)) {
    // change the earlier return to Promise.solve()
    // it becomes the return value of dispatching this action creator
    // which enable us to follow up inside component
    return Promise.resolve()
  }
  // Once we get the control of dispatch
  // We can dispatch an action whenever we want
  dispatch(requestTodos(filter))
  return api.fetchTodos(filter).then(response => {
    dispatch(receiveTodos(filter, response))
  })
}


export const addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    id: v4(),
    text
  }
}

export const toggleTodo = (id) => {
  return {
    type: 'TOGGLE_TODO',
    id
  }
}

