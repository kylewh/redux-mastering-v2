import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import { withRouter } from 'react-router-dom'
import TodoList from './TodoList'
import { getVisibleTodos } from '../reducers'
/**
 * We noticed inside the getVisibleTodos,
 * the arguments was specified to todos inside the state
 * It's a problem once we changed the state structure.
 * We should extract this selection and put into reducer
 * we will create a selector to fullfill this selection
 * Remember : using selector is a common best-practice in react
 */
const mapStateToProps = (state, { match }) => ({
  todos: getVisibleTodos(state, match.params.filter || 'all')
})

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id))
    }
  }
}

/**
 * Shortcut way
 * { propNames: actionCreator }
 */
const VisibleTodoList = withRouter(connect(
  mapStateToProps,
  { onTodoClick: toggleTodo}
)(TodoList))

export default VisibleTodoList
