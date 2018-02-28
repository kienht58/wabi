import React from "react"
import logo from "./logo.svg"
import {CircularProgress} from "material-ui/Progress"

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      isLoggingIn: false
    }
  }

  changeUsername = usr => this.setState({
    username: usr
  })

  changePassword = pwd => this.setState({
    password: pwd
  })

  manageLogin = async () => {
    const {username, password} = this.state
    this.setState({
      isLoggingIn: true
    })

    let response = await fetch('https://ancient-cove-12466.herokuapp.com/api/login', {
      method: 'POST',
      body: JSON.stringify({
        email: username,
        password: password
      })
    })

    let result = await response.json()
    console.log(result)

    this.setState({
      isLoggingIn: false
    })
  }

  render() {
    const {username, password, isLoggingIn} = this.state
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
          <img src={logo} alt="logo" style={{height: 24}}/>
        </div>
        <div
          style={{
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'stretch',
            flexDirection: 'column',
            backgroundColor: '#F7F7F7'
          }}
        >
          <div
            style={{
              display: 'flex',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'stretch',
              flexDirection: 'column',
              padding: '20px 15px 20px 15px'
            }}
          >
            <input
              type="text"
              placeholder="Số điện thoại"
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
                marginBottom: 20
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
                marginBottom: 20
              }}
              value={password}
              onFocus={(e) => e.target.setSelectionRange(0, password.length)}
              onChange={(e) => this.changePassword(e.target.value)}
            />
          </div>
        </div>
        <div
          style={{
            margin: '10px 0 20px 0',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <button
            style={{
              width: '60%',
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
    )
  }
}

export default Login