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
  