import { combineReducers } from 'redux'
import byId, * as fromById from './byId'
import createList, * as fromList from './createList'

// as mentioned before, we have this reducer with 3 child reducers
const listByFilter = combineReducers({
  all: createList('all'),
  active: createList('active'),
  completed: createList('completed')
})

const todos = combineReducers({
  byId,
  listByFilter
})

export default todos

// Deal with byId state selection

/**
 * This selector will be used in VisibleTodoList
 * We don't want this container component to handle the state selection\
 * In other words, component should know about structure of state 
 * ======== AS LESS AS POSSIBLE ! ========
 */

export const getVisibleTodos = (state, filter) => {
  const ids = fromList.getIds(state.listByFilter[filter])
  return ids.map(id => fromById.getTodo(state.byId, id))
}

// Deal with listByFilter state selection

/**
 * Because isFecthing is specific attribute of todoItems
 * We have to pick it out. It's sound like a navigator right?
 * We don't have to find out the target, I just give information and get the result.
 * Selector do all the dirty works for me.
 */
export const getIsFetching = (state, filter) =>
  fromList.getIsFecthing(state.listByFilter[filter])
  