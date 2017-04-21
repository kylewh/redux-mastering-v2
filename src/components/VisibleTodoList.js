import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { withRouter } from 'react-router-dom'
import TodoList from './TodoList'
import { getVisibleTodos } from '../reducers'

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
    const { filter, fetchTodos } = this.props
    // Now we want to extract this two nested operation
    // into n single action creator
    // So we don't have any asycn logic in the component
    fetchTodos(filter)
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
