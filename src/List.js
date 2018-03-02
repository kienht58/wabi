import React from "react"
import {CircularProgress} from "material-ui/Progress"
import Button from "material-ui/Button"
import Dialog from "material-ui/Dialog"
import Snackbar, {SnackbarContent} from "material-ui/Snackbar"
import {withStyles} from "material-ui/styles"

import Form from "./Form"
import location from "./location.svg"
import note from "./note.svg"
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
      showMsg: false
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

  toggleAddStoresDialog = () => this.setState({
    open: !this.state.open,
    keyword: ''
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
    let response = await fetch(`https://walkbike.herokuapp.com/api/stores?token=${accessToken}&keyword=${keyword}`)
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
    const {stores, loading, keyword, open, showMsg} = this.state
    const {accessToken} = this.props
    return (
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'stretch', flex: 1, padding: 20, borderTop: '0.6px solid #f7f7f7'}}>
        <input
          type="text"
          value={keyword}
          onChange={e => this.changeKeyword(e.target.value)}
          placeholder="Nhập tên cửa hàng, địa chỉ"
          style={{
            height: 48,
            paddingLeft: 60,
            borderRadius: 10,
            border: 'none',
            boxShadow: '0 1px 6px 0 rgba(117, 117, 117, 0.2), 0 1px 6px 0 rgba(151, 151, 151, 0.19)',
            backgroundImage: 'url(assets/images/search.svg)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '7%',
            backgroundPositionX: 18,
            backgroundPositionY: 15,
            marginBottom: 20
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
            <p style={{fontSize: 13, fontFamily: 'Roboto, sans-serif'}}>Số địa điểm đã thêm: {stores.length}</p>
            {stores.map((store, idx) => (
              <div
                key={idx}
                style={{
                   display: 'flex',
                   flexDirection: 'row',
                   borderRadius: 10,
                   boxShadow: '0 1px 6px 0 rgba(117, 117, 117, 0.2), 0 1px 6px 0 rgba(151, 151, 151, 0.19)',
                   padding: '4px',
                   margin: '0px 2px 10px 2px'
                }}
              >
                <div style={{display: 'flex', flex: 4}}>
                  <img src="http://via.placeholder.com/92x64" alt="placeholder" style={{borderRadius: 4}}/>
                </div>
                <div style={{display: 'flex', flex: 7, flexDirection: 'column'}}>
                  <span
                    style={{
                      fontSize: 14,
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      fontFamily: 'Roboto, sans-serif'
                    }}
                  >
                    {store.name}
                  </span>
                  <span
                    style={{
                      marginTop: 5,
                      fontSize: 10,
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      fontFamily: 'Roboto, sans-serif',
                      lineHeight: 1.5,
                      alignItems: 'flex-start'
                    }}
                  >
                    <img src={location} alt="location" style={{width: 15, height: 15}}/> &nbsp;&nbsp;
                    {store.address}
                  </span>
                  <span
                    style={{
                      marginTop: 4,
                      fontSize: 10,
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      fontFamily: 'Roboto, sans-serif',
                      display: 'flex',
                      justifyContent: 'space-between'
                    }}
                  >
                    <span style={{display: 'flex', alignItems: 'center'}}>
                      <img src={phone} alt="phone" style={{width: 12, height: 12}}/> &nbsp;&nbsp;
                      {store.phone_number}
                    </span>
                    <span style={{paddingRight: 8, display: 'flex', alignItems: 'center'}}>
                      <img src={clock} alt="clock" style={{width: 12, height: 12}}/> &nbsp;&nbsp;
                      <span>8:00 - 21:00</span>
                    </span>
                  </span>
                  <span
                    style={{
                      marginTop: 12,
                      fontSize: 10,
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      fontFamily: 'Roboto, sans-serif'
                    }}
                  >
                    <img src={note} alt="note" style={{width: 12, height: 12}}/> &nbsp;&nbsp;
                    {store.note}
                  </span>
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
          <Form accessToken={accessToken} toggleAddStoresDialog={this.toggleAddStoresDialog} showSuccessionMessage={this.showSuccessionMessage}/>
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
