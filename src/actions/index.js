import { v4 } from 'node-uuid'

/**
 * If we still use nextTodoId, there will be 
 * duplicated key in the todos :
 * 
 * Presumption: we had saved an item in the LocalStorage
 * 
 * In LocalStorage: id = 0 , key = 0, text: sth.
 * 
 * And then we add an todoItem, in runtime,
 * the initial nextTodoId is 0, hence the 
 * todoItem's id is 0.
 * 
 * Then we got two key '0' in the array
 * 
 * It violated the rule of unique key !
 * 
 * Solution: using node-uuid to produce unique id.
 */
export const addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    id: v4(),
    text
  }
}

export const setVisibilityFilter = (filter) => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter
  }
}

export const toggleTodo = (id) => {
  return {
    type: 'TOGGLE_TODO',
    id
  }
}
