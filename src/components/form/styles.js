const styles = {
  container: {
    backgroundColor: '#fff',
    fontFamily: 'SF UI Display Light'
  },
  appbar: {
    padding: '8px 0',
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  backIcon: {
    color: '#2a2e43',
    flex: 1,
    fontSize: 24,
    marginLeft: 10
  },
  logo: {
    height: 32,
    flex: 9,
    paddingRight: 32
  },
  mapContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 100,
    height: '100vh',
    backgroundColor: '#00000070',
    width: '100%'
  },
  map: {
    marginTop: 'calc((100vh - 300px)/2)',
    paddingLeft: '2.5%'
  },
  infoText: {
    fontSize: 13,
    fontFamily: 'SF UI Display',
    paddingLeft: 20
  },
  formWrapper: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    flexDirection: 'column',
    backgroundColor: '#F7F7F7'
  },
  formControl: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    flexDirection: 'column',
    padding: '20px 15px 0px 15px'
  },
  input: {
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
  },
  addressInput: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    marginBottom: 20,
    overflow: 'hidden',
    position: 'relative'
  },
  stackLayer: {
    width: 60,
    height: 62,
    position: 'absolute',
    left: 0,
    bottom: 0,
    zIndex: 10
  },
  mapLoadedIcon: {
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
  },
  mapLoadingIcon: {
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
  },
  getLocationButton: {
    background: '#fff',
    border: 'none',
    height: 62,
    width: 62,
    borderRadius: 10,
    margin: 2,
    boxShadow: '0 1px 6px 0 rgba(117, 117, 117, 0.2), 0 1px 6px 0 rgba(151, 151, 151, 0.19)',
    WebkitBoxShadow: '0 1px 6px 0 rgba(117, 117, 117, 0.2), 0 1px 6px 0 rgba(151, 151, 151, 0.19)',
  },
  phoneInput: {
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
  },
  note: {
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
  },
  imagesContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: '10px 10px 10px 15px',
    overflowX: 'scroll',
    margin: '5px 0'
  },
  addImageButton: {
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
  },
  thumbnail: {
    height: 64,
    width: 86,
    marginLeft: 10,
    marginRight: 7,
    borderRadius: 12,
    border: 'solid 1px #E8E8E8'
  },
  submitButton: {
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
  }
}

export default styles