import React from "react"
import {CircularProgress} from "material-ui/Progress"

import getCurrentAddress from '../../services/geocoding'
import {my_location, logo} from '../icons'
import {Iframe} from "../../utils"
import {API_URL} from "../../config"
import styles from './styles'


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
      showMap: false,
      editing: false
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
        let response = await getCurrentAddress(this.state.address.lat, this.state.address.lng)
        if(response.error) {
          // TODO: notify user
        } else {
          let address = response.data
          this.setState({
            address: {
              ...this.state.address,
              fullAddress: address.formatted_address
            },
            loadingMap: {
              loading: false,
              loadSuccess: true
            }
          })
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

        that.setState({
          imgs
        })
      }
    }
  }

  createStore = async () => {
    const {name, address, phone, time, note, imgs, editing} = this.state
    const {accessToken, store} = this.props
    this.setState({
      creating: true
    })

    let url = editing ? `${API_URL}/stores/${store.id}/update` : `${API_URL}/stores`
    let method = editing ? 'put' : 'post'

    let response = await fetch(url, {
      method: method,
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

  componentDidMount() {
      if(this.props.store && this.props.store.id) {
        let store = this.props.store
        this.setState({
          name: store.name,
          address: {
            fullAddress: store.address,
            lat: store.lat,
            lng: store.lng
          },
          phone: store.phone_number,
          note: store.note,
          editing: true
        })
      }
  }

  render() {
    const {name, address, phone, note, imgs, creating, loadingMap, showMap, editing} = this.state
    return (
      <div style={styles.container}>
        <div
          style={styles.appbar}
        >
          <i className="material-icons" onClick={this.props.toggleAddStoresDialog} style={styles.backIcon}>keyboard_backspace</i>
          <img src={logo} alt="logo" style={styles.logo}/>
        </div>
        {showMap && (
          <div
            style={styles.mapContainer}
          >
            <div
              style={styles.map}
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
        {editing && (
          <p
            style={styles.infoText}
          >
            Chỉnh sửa địa điểm
          </p>
        )}
        <div
          style={styles.formWrapper}
        >
          <div
            style={styles.formControl}
          >
            <input
              type="text"
              placeholder="Tên cửa hàng"
              style={styles.input}
              value={name}
              onFocus={(e) => e.target.setSelectionRange(0, name.length)}
              onChange={(e) => this.changeName(e.target.value)}
            />
            <div
              style={styles.addressInput}
            >
              {loadingMap.loadSuccess && (
                <div
                  style={styles.stackLayer}
                  onClick={() => this.showEmbeddedMap()}
                >

                </div>
              )}
              <input
                type="text"
                placeholder="Địa chỉ"
                style={loadingMap.loadSuccess ? styles.mapLoadedIcon : styles.mapLoadingIcon}
                value={address.fullAddress}
                onFocus={(e) => e.target.setSelectionRange(0, address.fullAddress.length)}
                onChange={(e) => this.changeAddress(e.target.value)}
                disabled={editing}
              />
              <button
                style={styles.getLocationButton}
                onClick={() => this.getCurrentLocation()}
                disabled={editing}
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
              style={styles.phoneInput}
              value={phone}
              onChange={(e) => this.changePhone(e.target.value)}
            />
            <input
              type="text"
              placeholder="Ghi chú"
              style={styles.note}
              value={note}
              onChange={(e) => this.changeNote(e.target.value)}
            />
          </div>
          {!editing && (
            <div
              style={styles.imagesContainer}
            >
              <button
                style={styles.addImageButton}

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
                      style={styles.thumbnail}
                      src={img}
                      alt="location"
                    />
                  ))
                )}
              </div>
            </div>
          )}
          <div
            style={{
              margin: '10px 0 20px 0',
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <button
              style={styles.submitButton}
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
