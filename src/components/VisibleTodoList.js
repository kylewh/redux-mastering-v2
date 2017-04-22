import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { withRouter } from 'react-router-dom'
import TodoList from './TodoList'
import { getVisibleTodos, getIsFetching } from '../reducers'

class VisibleTodoList extends Component {

  componentDidMount() {
    this.fetchData()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.filter !== this.props.filter) {
      this.fetchData()
    }
  }

  fetchData () {
    const { filter, requestTodos, fetchTodos } = this.props
    // Watch out! here is an async flow.
    // No way to do this in your app
    // We should wrap it into an single async action
    // dispatch REQUEST_TODO action => waitting for data
    // => dispatch RECEIVE_TODO action
    requestTodos(filter)
    fetchTodos(filter)
  }

  render () {
    const { toggleTodo, isFecthing, todos } = this.props
    if (isFecthing && !todos.length) {
      return <p>Loading</p>
    }
    return (
      <TodoList
        todos={todos}
        onTodoClick={toggleTodo}
      />
    )
  }
}

const mapStateToProps = (state, { match }) => {
  const filter = match.params.filter || 'all'
  return {
    todos: getVisibleTodos(state, filter),
    isFecthing: getIsFetching(state, filter),
    filter
  }
}

/**
 * we do this for utlizing lifecycle hook above
 */
VisibleTodoList = withRouter(connect(
  mapStateToProps,
  actions
)(VisibleTodoList))

export default VisibleTodoList
