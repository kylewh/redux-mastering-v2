import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import { withRouter } from 'react-router-dom'
import TodoList from './TodoList'

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'all':
      return todos
    case 'completed':
      return todos.filter(t => t.completed)
    case 'active':
      return todos.filter(t => !t.completed)
    default:
      throw new Error(`Unknown filter: ${filter}.`)
  }
}

const mapStateToProps = (state, { match }) => ({
  todos: getVisibleTodos(state.todos, match.params.filter || 'all')

})

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id))
    }
  }
}

const VisibleTodoList = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList))

export default VisibleTodoList
