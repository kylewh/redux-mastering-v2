import { v4 } from 'node-uuid'
import * as api from '../api'

const receiveTodos = (filter, response) => ({
  type: 'RECEIVE_TODOS',
  filter,
  response
})

// Now be careful, this action creator's
// return value is a promise.
// Redux only allows dispatch in plain objects rather than promises.
// So we have to make this async action acceptable to dispatch
// Here is why will use middleware in future
// Before that, we are going to implement stuffs like middleware
export const fetchTodos = (filter) =>
  api.fetchTodos(filter).then(response =>
    receiveTodos(filter, response)
  )

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

