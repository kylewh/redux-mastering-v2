import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { withRouter } from 'react-router-dom'
import TodoList from './TodoList'
import { getVisibleTodos } from '../reducers'
import { fetchTodos } from '../api'

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
    // receiveTodos come from actionCreators,
    // injected by connect()
    const { filter, receiveTodos } = this.props
    // when we get data from api,
    // we dispatch an action for updating state
    // then we can see the data be rendered
    // before there, we have to implement corresponding reducers
    // You may foresee this reducers will be another combined reducer
    // because we will have three child-state:
    // 1. all 2.active 3.completed
    fetchTodos(filter).then(todos => {
      receiveTodos(filter, todos)
    })
  }

  render () {
    const { toggleTodo, ...rest } = this.props
    return (
      <TodoList
        { ...rest }
        onTodoClick={toggleTodo}
      />
    )
  }
}

const mapStateToProps = (state, { match }) => {
  const filter = match.params.filter || 'all'
  return {
    todos: getVisibleTodos(state, filter),
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
