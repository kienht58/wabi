import React from "react"
import {CircularProgress} from "material-ui/Progress"

import my_location from "./my_location.svg"
import logo from "./logo.svg"
import Iframe from "./Iframe"


class Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      address: {
        fullAddress: '',
        lat: '',
        lng: ''
      },
      phone: '',
      time: {
        from: '',
        to: ''
      },
      note: '',
      imgs: [],
      creating: false,
      loadingMap: {
        loading: false,
        loadSuccess: false
      },
      showMap: false
    }
  }

  changeName = name => this.setState({ name })

  changeAddress = address => {
    this.setState({
      address: {
        ...this.state.address,
        fullAddress: address
      }
    })
  }

  getCurrentLocation = () => {
    this.setState({
      loadingMap: {
        loading: true
      }
    })
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        address: {
          ...this.state.address,
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      }, async () => {
        let response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.address.lat},${this.state.address.lng}&key=AIzaSyBDWNf6gvLGEJvsdTUU2plNtzqzdiifEEg`)
        let result = await response.json()
        if(result.status === 'OK') {
          this.setState({
            address: {
              ...this.state.address,
              fullAddress: result.results[0].formatted_address
            },
            loadingMap: {
              loading: false,
              loadSuccess: true
            }
          })
        } else if(result.status === 'ZERO_RESULTS') {

        }
      })
    })
  }

  showEmbeddedMap = () => {
    let that = this
    this.setState({
      showMap: true
    }, () => {
      document.addEventListener('touchend', function(event) {
        if(that.wrapperRef && !that.wrapperRef.contains(event.target)) {
          that.setState({
            showMap: false
          })
        }
      })
    })
  }

  closeMap = () => this.setState({
    showMap: false
  })

  changePhone = phone => this.setState({ phone })

  changeNote = note => this.setState({ note })

  changeTimeFrom = time => this.setState({
    time: {
      ...this.state.time,
      from: time
    }
  })

  changeTimeTo = time => this.setState({
    time: {
      ...this.state.time,
      to: time
    }
  })

  addImages = images => {
    let that = this
    let imgs = this.state.imgs.slice()

    for(let i = 0; i < images.length; i++) {
      let reader = new FileReader()
      reader.readAsDataURL(images[i])
      reader.onload = function() {
        imgs.push(reader.result)

        that.setState({ imgs })
      }
    }
  }

  createStore = async () => {
    const {name, address, phone, time, note, imgs} = this.state
    const {accessToken} = this.props
    this.setState({
      creating: true
    })

    let response = await fetch('https://walkbike.herokuapp.com/api/stores', {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        lat: address.lat,
        lng: address.lng,
        phone: phone,
        address: address.fullAddress,
        note: note,
        from_time: time.from,
        to_time: time.to,
        images: imgs,
        token: accessToken
      })
    })

    let result = await response.json()

    if(response.ok && response.status === 200) {
      if(!result.error) {
        this.props.toggleAddStoresDialog()
        this.props.showSuccessionMessage()
      } else {
        // TODO: notify
      }
    } else {
      //TODO: warn about server error
    }
  }

  setWrapperRef = node => {
    this.wrapperRef = node
  }

  render() {
    const {name, address, phone, note, imgs, time, creating, loadingMap, showMap} = this.state
    return (
      <div style={{backgroundColor: '#fff', fontFamily: 'SF UI Display Light'}}>
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
          <i className="material-icons" onClick={this.props.toggleAddStoresDialog} style={{color: '#2a2e43', flex: 1, fontSize: 24, marginLeft: 10}}>keyboard_backspace</i>
          <img src={logo} alt="logo" style={{height: 32, flex: 9, paddingRight: 32}}/>
        </div>
        {showMap && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              zIndex: 100,
              height: '100vh',
              backgroundColor: '#00000070',
              width: '100%'
            }}
          >
            <div
              style={{
                marginTop: 'calc((100vh - 300px)/2)',
                paddingLeft: '2.5%'
              }}
              ref={this.setWrapperRef}
            >
              <Iframe
                url={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBDWNf6gvLGEJvsdTUU2plNtzqzdiifEEg&q=${encodeURI(address.fullAddress)}`}
                width="95%"
                height="300"
                allowFullScreen={true}
                position="fixed"
                display="initial"
              />
            </div>
          </div>
        )}
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
              padding: '20px 15px 0px 15px'
            }}
          >
            <input
              type="text"
              placeholder="Tên cửa hàng"
              style={{
                height: 56,
                paddingLeft: 60,
                borderRadius: 16,
                border: 'none',
                WebkitAppearance: 'none',
                boxShadow: '0 1px 6px 0 rgba(117, 117, 117, 0.2), 0 1px 6px 0 rgba(151, 151, 151, 0.19)',
                WebkitBoxShadow: '0 1px 6px 0 rgba(117, 117, 117, 0.2), 0 1px 6px 0 rgba(151, 151, 151, 0.19)',
                backgroundImage: 'url(assets/images/home.svg)',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '7%',
                backgroundPositionX: 18,
                backgroundPositionY: 20,
                marginBottom: 20
              }}
              value={name}
              onFocus={(e) => e.target.setSelectionRange(0, name.length)}
              onChange={(e) => this.changeName(e.target.value)}
            />
            <div
              style={{
                display: 'flex',
                flex: 1,
                alignItems: 'center',
                marginBottom: 20,
                overflow: 'hidden',
                position: 'relative'
              }}
            >
              {loadingMap.loadSuccess && (
                <div
                  style={{
                    width: 60,
                    height: 62,
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                    zIndex: 10
                  }}
                  onClick={() => this.showEmbeddedMap()}
                >

                </div>
              )}
              <input
                type="text"
                placeholder="Địa chỉ"
                style={loadingMap.loadSuccess ? {
                  height: 60,
                  paddingLeft: 60,
                  paddingRight: 10,
                  border: 'none',
                  WebkitAppearance: 'none',
                  backgroundRepeat: 'no-repeat',
                  borderRadius: 16,
                  margin: '2px 8px 2px 2px',
                  boxShadow: '0 1px 6px 0 rgba(117, 117, 117, 0.2), 0 1px 6px 0 rgba(151, 151, 151, 0.19)',
                  WebkitBoxShadow: '0 1px 6px 0 rgba(117, 117, 117, 0.2), 0 1px 6px 0 rgba(151, 151, 151, 0.19)',
                  backgroundImage: 'url(assets/images/location_red.svg)',
                  backgroundSize: '8%',
                  backgroundPositionX: 21,
                  backgroundPositionY: 22,
                  flex: 2,
                  position:'relative'
                } : {
                  height: 60,
                  paddingLeft: 60,
                  paddingRight: 10,
                  border: 'none',
                  WebkitAppearance: 'none',
                  backgroundRepeat: 'no-repeat',
                  borderRadius: 16,
                  margin: '2px 8px 2px 2px',
                  boxShadow: '0 1px 6px 0 rgba(117, 117, 117, 0.2), 0 1px 6px 0 rgba(151, 151, 151, 0.19)',
                  WebkitBoxShadow: '0 1px 6px 0 rgba(117, 117, 117, 0.2), 0 1px 6px 0 rgba(151, 151, 151, 0.19)',
                  backgroundImage: 'url(assets/images/location.svg)',
                  backgroundSize: '6.5%',
                  backgroundPositionX: 21,
                  backgroundPositionY: 22,
                  flex: 2,
                  position:'relative'
                }}
                value={address.fullAddress}
                onFocus={(e) => e.target.setSelectionRange(0, address.fullAddress.length)}
                onChange={(e) => this.changeAddress(e.target.value)}
              />
              <button
                style={{
                  background: '#fff',
                  border: 'none',
                  height: 62,
                  width: 62,
                  borderRadius: 10,
                  margin: 2,
                  boxShadow: '0 1px 6px 0 rgba(117, 117, 117, 0.2), 0 1px 6px 0 rgba(151, 151, 151, 0.19)',
                  WebkitBoxShadow: '0 1px 6px 0 rgba(117, 117, 117, 0.2), 0 1px 6px 0 rgba(151, 151, 151, 0.19)',
                }}
                onClick={() => this.getCurrentLocation()}
              >
                {loadingMap.loading ? (
                  <CircularProgress size={24} />
                ) : (
                  <img src={my_location} style={{width: 24, height: 24}} alt="location"/>
                )}
              </button>
            </div>
            <input
              type="tel"
              placeholder="Số điện thoại"
              style={{
                height: 56,
                paddingLeft: 60,
                borderRadius: 16,
                border: 'none',
                WebkitAppearance: 'none',
                boxShadow: '0 1px 6px 0 rgba(117, 117, 117, 0.2), 0 1px 6px 0 rgba(151, 151, 151, 0.19)',
                WebkitBoxShadow: '0 1px 6px 0 rgba(117, 117, 117, 0.2), 0 1px 6px 0 rgba(151, 151, 151, 0.19)',
                backgroundImage: 'url(assets/images/phone.svg)',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '7%',
                backgroundPositionX: 17,
                backgroundPositionY: 20,
                marginBottom: 20
              }}
              value={phone}
              onChange={(e) => this.changePhone(e.target.value)}
            />
            <input
              type="text"
              placeholder="Ghi chú"
              style={{
                height: 56,
                paddingLeft: 60,
                borderRadius: 16,
                border: 'none',
                WebkitAppearance: 'none',
                boxShadow: '0 1px 6px 0 rgba(117, 117, 117, 0.2), 0 1px 6px 0 rgba(151, 151, 151, 0.19)',
                WebkitBoxShadow: '0 1px 6px 0 rgba(117, 117, 117, 0.2), 0 1px 6px 0 rgba(151, 151, 151, 0.19)',
                backgroundImage: 'url(assets/images/note.svg)',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '7%',
                backgroundPositionX: 17,
                backgroundPositionY: 20,
                marginBottom: 20
              }}
              value={note}
              onChange={(e) => this.changeNote(e.target.value)}
            />
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#fff',
              padding: '10px 10px 10px 15px',
              overflowX: 'scroll',
              margin: '5px 0'
            }}
          >
            <button
              style={{
                textTransform: 'uppercase',
                color: 'white',
                fontSize: 13,
                whiteSpace: 'nowrap',
                background: '#2A2E43',
                padding: '18px 20px 18px 48px',
                borderRadius: 12,
                border: 'none',
                WebkitAppearance: 'none',
                backgroundImage: 'url(assets/images/add-image.svg)',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '18%',
                backgroundPositionX: 13,
                backgroundPositionY: 15
              }}

              onClick={() => this.inputFile.click()}
            >
              Thêm ảnh
            </button>
            <input
              type="file"
              accept="image/*"
              style={{display: 'none'}}
              ref={ip => this.inputFile = ip}
              onChange={(e) => this.addImages(e.target.files)}
              multiple
            />
            <div style={{display: 'flex', flexDirection: 'row'}}>
              {(imgs.length > 0) && (
                imgs.map((img, idx) => (
                  <img
                    key={idx}
                    style={{
                      height: 64,
                      width: 86,
                      marginLeft: 10,
                      marginRight: 7,
                      borderRadius: 12,
                      border: 'solid 1px #E8E8E8'
                    }}
                    src={img}
                    alt="location"
                  />
                ))
              )}
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
                width: '40%',
                height: 42,
                borderRadius: 8,
                backgroundColor: '#3ACCE1',
                fontSize: 13,
                color: 'white',
                textTransform: 'uppercase',
                border: 'none',
                WebkitAppearance: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onClick={this.createStore}
            >
              {creating && <CircularProgress size={20} style={{color: '#fff'}} />}&nbsp;&nbsp;Bổ sung
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Form
