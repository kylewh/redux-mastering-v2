const byId = (state = {}, action) => {
  switch (action.type) {
    case 'RECEIVE_TODOS':
      // shallow copy for following immutable rule
      const nextState = { ...state }
      action.response.forEach(todo =>
        nextState[todo.id] = todo
      )
      return nextState
    default:
      return state
  }
}

// now byId is not longer just lookup table
export default byId

// selector
export const getTodo = (state, id) => state[id]