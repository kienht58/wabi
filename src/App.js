import React, { Component } from 'react'
import {withCookies} from "react-cookie"
import {CircularProgress} from "material-ui/Progress"

import logo from "./logo.svg"
import Form from "./Form"
import Login from "./Login"
import List from "./List"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false,
      checkLogin: true
    }
  }

  verifyUser = () => this.setState({
    isLoggedIn: true,
    checkLogin: false
  })

  async componentWillMount() {
    const {cookies} = this.props
    const accessToken = cookies.get('token')

    if(accessToken) {
      let response = await fetch(`https://walkbike.herokuapp.com/api/validateUserToken?token=${accessToken}`)
      let result = await response.json()

      if(result.error) {
        this.setState({
          isLoggedIn: false,
          checkLogin: false
        })
      } else {
        this.verifyUser()
      }
    } else {
      this.setState({
        isLoggedIn: false,
        checkLogin: false
      })
    }
  }

  render() {
    const {checkLogin, isLoggedIn} = this.state
    const {cookies} = this.props
    const accessToken = cookies.get('token')
    return (
      <div>
        <div
          style={{
            padding: '8px 0',
            display: 'flex',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff'
          }}
        >
          <img src={logo} alt="logo" style={{height: 32}}/>
        </div>
        {checkLogin ? (
          <div
            style={{
              color: '#fff',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'rgba(255, 255, 255, .3)'
            }}
          >
            <CircularProgress
              size={30}
              style={{
                position: 'absolute',
                top: 'calc(50% - 30px)',
                left: 'calc(50% - 15px)',
                color: '#79dceb'
              }}
            />
          </div>
        ) : (
          isLoggedIn ? (
            <List accessToken={accessToken} />
          ) : (
            <Login verifyUser={this.verifyUser}/>
          )
        )}
      </div>
    )
  }
}

export default withCookies(App);
