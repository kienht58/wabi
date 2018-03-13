import {GOOGLE_MAP_API_KEY, GOOGLE_MAP_GEOCODING_API_URL} from "../../config"

export default async function getCurrentAddress(lat, lng) {
  let response = await fetch(`${GOOGLE_MAP_GEOCODING_API_URL}/json?latlng=${lat},${lng}&key=${GOOGLE_MAP_API_KEY}`)
  let result = await response.json()
  if(response.ok && response.status === 200) {
    if(result.status === 'OK') {
      return {
        error: false,
        data: result.results[0]
      }
    } else if(result.status === 'ZERO_RESULTS') {
      return {
        error: false,
        data: null
      }
    } else {
      return {
        error: true,
        data: null
      }
    }
  }
}