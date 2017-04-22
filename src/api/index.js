import { v4 } from 'node-uuid'

const fakeDatabase = {
  todos: [{
    id: v4(),
    text: 'hola',
    completed: true
  },{
    id: v4(),
    text: 'Gotcha',
    completed: true
  },{
    id: v4(),
    text: 'em em',
    completed: false
  }]
}

const delay = (ms) =>
  new Promise(resolve => setTimeout(resolve, ms))

export const fetchTodos = (filter) =>
  delay(1000).then(() => {
    if (Math.random() > 0.5) {
      throw new Error('Crash!')
    }
    switch (filter) {
      case 'all':
        return fakeDatabase.todos
      case 'active':
        return fakeDatabase.todos.filter(t => !t.completed)
      case 'completed':
        return fakeDatabase.todos.filter(t => t.completed)
      default:
        throw new Error(`Unknown Filter: ${filter}`)
    }
  })

export const addTodo = (text) =>
  delay(500).then(() => {
    const todo = {
      id: v4(),
      text,
      completed: false
    }
    fakeDatabase.todos.push(todo)
    return todo
  })

export const toggleTodo = (text) =>
  delay(500).then(() => {
    const todo = fakeDatabase.todos.find(t => t.id === id)
    todo.completed = !todo.completed
    return todo
  })

