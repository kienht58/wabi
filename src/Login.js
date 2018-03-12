import React from "react"
import {CircularProgress} from "material-ui/Progress"

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

    let response = await fetch('http://localhost:8000/api/login', {
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
          style={{
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'stretch',
            flexDirection: 'column',
            backgroundColor: '#F7F7F7',
            fontFamily: 'SF UI Display'
          }}
        >
          <div style={{padding: '20px 20px 10px 20px'}}>
            {warning && (
              <span style={{fontSize: 13, color: '#f04846'}}>Tên đăng nhập hoặc mật khẩu không chính xác!</span>
            )}
          </div>
          <div
            style={{
              display: 'flex',
              flex: 1,
              alignItems: 'stretch',
              flexDirection: 'column',
              padding: '10px 15px 20px 15px',
              height: '100vh'
            }}
          >
            <input
              type="text"
              placeholder="Tên đăng nhập"
              style={{
                height: 60,
                paddingLeft: 60,
                borderRadius: 16,
                border: 'none',
                boxShadow: '0 1px 6px 0 rgba(117, 117, 117, 0.2), 0 1px 6px 0 rgba(151, 151, 151, 0.19)',
                backgroundImage: 'url(assets/images/phone.svg)',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '7%',
                backgroundPositionX: 18,
                backgroundPositionY: 20,
                marginBottom: 20,
                fontFamily: 'SF UI Display'
              }}
              value={username}
              onFocus={(e) => e.target.setSelectionRange(0, username.length)}
              onChange={(e) => this.changeUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Mật khẩu"
              style={{
                height: 60,
                paddingLeft: 60,
                borderRadius: 16,
                border: 'none',
                boxShadow: '0 1px 6px 0 rgba(117, 117, 117, 0.2), 0 1px 6px 0 rgba(151, 151, 151, 0.19)',
                backgroundImage: 'url(assets/images/password.svg)',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '7%',
                backgroundPositionX: 18,
                backgroundPositionY: 20,
                marginBottom: 20,
                fontFamily: 'SF UI Display'
              }}
              value={password}
              onFocus={(e) => e.target.setSelectionRange(0, password.length)}
              onChange={(e) => this.changePassword(e.target.value)}
            />
            <button
              style={{
                width: '100%',
                height: 42,
                borderRadius: 8,
                backgroundColor: '#3ACCE1',
                fontSize: 13,
                color: 'white',
                textTransform: 'uppercase',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onClick={this.manageLogin}
            >
              {isLoggingIn && (
                <CircularProgress size={20} style={{color: '#fff'}}/>
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
