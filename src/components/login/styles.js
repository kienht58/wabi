const styles = {
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    flexDirection: 'column',
    backgroundColor: '#F7F7F7',
    fontFamily: 'SF UI Display'
  },
  warning: {
    padding: '20px 20px 10px 20px',
  },
  warningText: {
    fontSize: 13,
    color: '#f04846'
  },
  loginForm: {
    display: 'flex',
    flex: 1,
    alignItems: 'stretch',
    flexDirection: 'column',
    padding: '10px 15px 20px 15px',
    height: '100vh'
  },
  inputName: {
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
  },
  inputPassword: {
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
  },
  loginButton: {
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
  },
  indicator: {
    color: '#fff'
  }
}

export default styles