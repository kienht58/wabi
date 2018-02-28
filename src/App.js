import React, { Component } from 'react'
import Form from "./Form"
import Login from "./Login"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false
    }
  }

  verifyUser = () => this.setState({
    isLoggedIn: true
  })

  render() {
    const {isLoggedIn} = this.state
    if(isLoggedIn) {
      return (
        <Form />
      )
    } else {
      return (
        <Login verifyUser={this.verifyUser}/>
      )
    }
  }
}

export default App;
