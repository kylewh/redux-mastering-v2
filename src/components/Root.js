import React from 'react'
import { Provider } from 'react-redux'
import App from './App'
import { BrowserRouter as Router, Route } from 'react-router-dom'

/**
 * See : http://stackoverflow.com/questions/35604617/react-router-with-optional-path-parameter
 */
const Root = ({ store }) => (
  <Provider store={store} >
    <Router>
      <Route
        path='/:filter?'
        component={App}
        exact
      />
    </Router>
  </Provider>
)

export default Root
