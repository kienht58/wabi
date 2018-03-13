import React from "react"
import {CircularProgress} from "material-ui/Progress"

import styles from './styles'
import {API_URL} from "../../config"


class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      isLoggingIn: false,
      warning: false
    }
  }

  changeUsername = usr => this.setState({
    username: usr
  })

  changePassword = pwd => this.setState({
    password: pwd
  })

  componentDidMount() {
    window.addEventListener('keypress', (event) => {
      if (event.keyCode === 13) {
        this.manageLogin()
      }
    })
  }

  manageLogin = async () => {
    const {username, password} = this.state
    this.setState({
      isLoggingIn: true
    })

    let response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        email: username,
        password: password
      })
    })

    let result = await response.json()

    if(response.ok && response.status === 200) {
      if(result.token) {
        document.cookie = `token=${result.token}`
        this.props.verifyUser()
      }
    } else {
      if(response.status === 422) {
        this.setState({
          warning: true,
          isLoggingIn: false
        })
      }
    }
  }

  render() {
    const {username, password, isLoggingIn, warning} = this.state
    return (
      <div>
        <div
          style={styles.container}
        >
          <div style={styles.warning}>
            {warning && (
              <span style={styles.warningText}>Tên đăng nhập hoặc mật khẩu không chính xác!</span>
            )}
          </div>
          <div
            style={styles.loginForm}
          >
            <input
              type="text"
              placeholder="Tên đăng nhập"
              style={styles.inputName}
              value={username}
              onFocus={(e) => e.target.setSelectionRange(0, username.length)}
              onChange={(e) => this.changeUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Mật khẩu"
              style={styles.inputPassword}
              value={password}
              onFocus={(e) => e.target.setSelectionRange(0, password.length)}
              onChange={(e) => this.changePassword(e.target.value)}
            />
            <button
              style={styles.loginButton}
              onClick={this.manageLogin}
            >
              {isLoggingIn && (
                <CircularProgress size={20} style={styles.indicator}/>
              )}
              &nbsp;&nbsp;Đăng nhập
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
