import React from "react"
import {CircularProgress} from "material-ui/Progress"
import Button from "material-ui/Button"
import Dialog from "material-ui/Dialog"
import Snackbar, {SnackbarContent} from "material-ui/Snackbar"
import {withStyles} from "material-ui/styles"

import Form from "./Form"

import phone from "./phone.svg"
import clock from './clock.svg'

const styles = {
  root: {
    backgroundColor: '#F7F7F7'
  },
  paper: {
    backgroundColor: '#F7F7F7'
  }
}

var ccr

class List extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      stores: [],
      loading: false,
      open: false,
      keyword: '',
      showMsg: false,
      edittingStore: ''
    }
  }

  componentDidMount() {
    this.fetchStores()
  }

  showSuccessionMessage = () => {
    this.fetchStores()
    this.setState({
      showMsg: true
    })
  }

  closeSuccessionMessage = () => this.setState({
    showMsg: false
  })

  toggleAddStoresDialog = (store = {}) => this.setState({
    open: !this.state.open,
    keyword: '',
    edittingStore: store
  })

  changeKeyword = kw => this.setState({
    keyword: kw
  }, () => {
    clearInterval(ccr)
    ccr = setTimeout(() => {
      this.fetchStores()
    }, 500)
  })

  fetchStores = async () => {
    this.setState({
      loading: true
    })

    const {keyword} = this.state
    const {accessToken} = this.props
    let response = await fetch(`http://localhost:8000/api/stores?token=${accessToken}&keyword=${keyword}`)
    let result = await response.json()
    if(response.ok && response.status === 200) {
      if(result.data) {
        this.setState({
          loading: false,
          stores: result.data
        })
      }
    } else {
      //TODO: warn user about server status
    }
  }

  render() {
    const {stores, loading, keyword, open, showMsg, edittingStore} = this.state
    const {accessToken} = this.props
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          flex: 1,
          padding: 10,
          height: '100vh',
          backgroundColor: '#F7F7F7'
        }}
      >
        <input
          type="text"
          value={keyword}
          onChange={e => this.changeKeyword(e.target.value)}
          placeholder="Nhập tên cửa hàng, địa chỉ"
          style={{
            padding: '10px 10px 10px 60px',
            borderRadius: 10,
            border: 'none',
            backgroundImage: 'url(assets/images/search.svg)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '5%',
            backgroundPositionX: 18,
            backgroundPositionY: 10,
            marginBottom: 10
          }}
        />
        {loading ? (
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
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'stretch', overflowY: 'scroll'}}>
            <p
              style={{
                fontSize: 13,
                fontFamily: 'SF UI Display'
              }}
            >
              Số địa điểm đã thêm: {stores.length}
            </p>
            {stores.map((store, idx) => (
              <div
                key={idx}
                style={{
                  borderRadius: 10,
                  boxShadow: '0 1px 6px 0 rgba(117, 117, 117, 0.2), 0 1px 6px 0 rgba(151, 151, 151, 0.19)',
                  padding: '8px',
                  marginBottom: 8,
                  backgroundColor: 'white'
                }}
              >
                <div style={{width: '30%', float: 'left', marginRight: 8}}>
                  <img
                    src={store.image ? `http://localhost:8000/${store.image.url}` : "http://via.placeholder.com/81x80"}
                    alt="placeholder"
                    style={{borderRadius: 4, width: '100%'}}
                  />
                </div>
                <div
                  style={{
                    width: 'calc(70% - 8px)',
                    fontFamily: 'SF UI Display',
                    float: 'left'
                  }}
                >
                  <div
                    style={{
                      fontSize: 14,
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden'
                    }}
                  >
                    <span>{store.name}</span>
                    <span style={{float: 'right'}} onClick={() => this.toggleAddStoresDialog(store)}>
                      <i className="material-icons" style={{fontSize: 14, color: 'rgb(99, 83, 83)'}}>edit</i>
                    </span>
                  </div>
                  <div
                    style={{
                      marginTop: 5,
                      fontSize: 12,
                      color: 'rgb(99, 83, 83)'
                    }}
                  >
                    {store.address}
                  </div>
                  <div
                    style={{
                      marginTop: 4,
                      fontSize: 10,
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      display: 'flex',
                      justifyContent: 'space-between',
                      color: 'rgb(99, 83, 83)'
                    }}
                  >
                    <span
                      style={{
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        fontSize: 12,
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <img src={phone} alt="phone" style={{width: 14}}/>
                      {store.phone_number}
                    </span>
                    <span
                      style={{paddingRight: 8, display: 'flex', alignItems: 'center'}}
                    >
                      <img src={clock} alt="time" style={{width :14}} />
                      &nbsp;<span>8:00 - 21:00</span>
                    </span>
                  </div>
                  <div
                    style={{
                      marginTop: 4,
                      fontSize: 12,
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden'
                    }}
                  >
                    {store.note}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <Button
          variant="fab"
          style={{
            color: '#fff',
            backgroundColor: '#3acce1',
            position: 'fixed',
            bottom: 30,
            right: 30,
          }}
          onClick={this.toggleAddStoresDialog}
        >
          <i className="material-icons">edit</i>
        </Button>
        <Dialog
          fullScreen
          open={open}
          onClose={this.toggleAddStoresDialog}
          classes={{
            root: this.props.classes.root,
            paper: this.props.classes.paper
          }}
        >
          <Form
            accessToken={accessToken}
            toggleAddStoresDialog={this.toggleAddStoresDialog}
            showSuccessionMessage={this.showSuccessionMessage}
            store={edittingStore}
          />
        </Dialog>
        <Snackbar
          anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
          open={showMsg}
          onClose={this.closeSuccessionMessage}
        >
          <SnackbarContent
            message={'Thêm địa điểm thành công!'}
          />
        </Snackbar>

      </div>
    )
  }
}

export default withStyles(styles)(List)
