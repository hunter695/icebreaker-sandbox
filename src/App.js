import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Root from 'components/Root'
import Home from 'scenes/Home'
import Contribute from 'scenes/Contribute'

const App = () => (
  <Router>
    <Root>
      <Switch>
        <Route exact path="/" render={Home} />
        <Route path="/contribute" render={Contribute} />
        <Route exact path="/about" render={() => <h1>About</h1>} />
        <Route render={() => <h1>Not Found</h1>} />
      </Switch>
    </Root>
  </Router>
)

export default App
