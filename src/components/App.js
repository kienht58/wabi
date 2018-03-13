import React, { Component } from 'react'
import {withCookies} from "react-cookie"
import {CircularProgress} from "material-ui/Progress"

import {logo} from "./icons"

import Login from "./login"
import List from "./list"

import {API_URL} from "../config"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false,
      loggingIn: true
    }
  }

  verifyUser = () => this.setState({
    isLoggedIn: true,
    loggingIn: false
  })

  async componentWillMount() {
    const {cookies} = this.props
    const accessToken = cookies.get('token')

    if(accessToken) {
      let response = await fetch(`${API_URL}/validateUserToken?token=${accessToken}`)
      let result = await response.json()

      if(result.error) {
        this.setState({
          isLoggedIn: false,
          loggingIn: false
        })
      } else {
        this.verifyUser()
      }
    } else {
      this.setState({
        isLoggedIn: false,
        loggingIn: false
      })
    }
  }

  render() {
    const {loggingIn, isLoggedIn} = this.state
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
        {loggingIn ? (
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
