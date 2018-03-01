import React from 'react'
import PlacesAutocomplete from 'react-places-autocomplete'
import {CircularProgress} from "material-ui/Progress"
import location from "./location.svg"

const renderSuggestion = ({ formattedSuggestion }) => (
  <div className="Demo__suggestion-item">
    <img src={location} alt="location" style={{width: 8, paddingRight: 8}}/>
    <strong>{formattedSuggestion.mainText}</strong>{' '}
    <small style={{fontSize: 11}}>{formattedSuggestion.secondaryText}</small>
  </div>
)

const styles = {
  input: {
    height: 56,
    width: '100%',
    paddingLeft: 60,
    paddingRight: 10,
    border: 'none',
    WebkitAppearance: 'none',
    backgroundImage: 'url(assets/images/location.svg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '5%',
    backgroundPositionX: 22,
    backgroundPositionY: 27
  },
  autocompleteContainer: {
    position: 'relative',
    zIndex: 9999,
    borderBottom: 'honeydew',
    borderLeft: 'honeydew',
    borderRight: 'honeydew',
    borderTop: '1px solid #e6e6e6',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
    borderRadius: '0 0 2px 2px'
  }
}

const shouldFetchSuggestions = ({ value }) => value.length > 2

class Autocomplete extends React.Component {
  render() {
    const inputProps = {
      type: 'text',
      value: this.props.address.fullAddress,
      onChange: this.props.changeAddress,
      placeholder: 'Địa chỉ',
    }

    return (
      <div>
        <PlacesAutocomplete
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          styles={styles}
          onSelect={this.props.setAddress}
          onEnterKeyDown={this.handleSelect}
          shouldFetchSuggestions={shouldFetchSuggestions}
        />
        {this.props.loading && (
          <div>
            <CircularProgress size={20}/>
          </div>
        )}
      </div>
    )
  }
}

export default Autocomplete
