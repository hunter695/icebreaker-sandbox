import React from 'react'
import 'normalize.css'
import { HelloTitle, AppTitle } from '../Title'

export default class App extends React.Component {
  getContent = () => 'Footer'

  render() {
    return (
      <div>
        <HelloTitle />
        <AppTitle />
        {this.getContent()}
      </div>
    )
  }
}
