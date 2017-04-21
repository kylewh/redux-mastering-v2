import React, { Component } from 'react'
import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import { withRouter } from 'react-router-dom'
import TodoList from './TodoList'
import { getVisibleTodos } from '../reducers'
import { fetchTodos } from '../api'

class VisibleTodoList extends Component {
  componentDidMount() {
    fetchTodos(this.props.filter).then(todos => {
      console.log(this.props.filter, todos)
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.filter !== this.props.filter) {
      fetchTodos(this.props.filter).then(todos => {
        console.log(this.props.filter, todos)
      })
    }
  }

  render () {
    return <TodoList { ...this.props }/>
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
  { onTodoClick: toggleTodo}
)(VisibleTodoList))

export default VisibleTodoList
