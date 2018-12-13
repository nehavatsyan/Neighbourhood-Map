/*
 Used Foursquare API Developer docs and app for integrating 3rd Party API.
 Link: https://developer.foursquare.com/docs/api/
*/
class Helper {
  static baseURL(){
    return "https://api.foursquare.com/v2/"; 
  }
  static auth() {
    const keys = {
      client_id: "LDJNPQIUF1SPI1HSXT5MIHLKDG1PR5DCESJRRADQZU5ZL4WP",
      client_secret: "U0MKI40ZBLJNRUF01D24TPZROLVDZJFBLSHXI4SM45CD1IJP",
      v:"20181214"
    };
    return Object.keys(keys).map(key => `${key}=${keys[key]}`).join("&"); //v as of developing date
  }
  static urlBuilder(params) {
    if(!params) {
      return ""
    }
    return Object.keys(params).map(key => `${key}=${params[key]}`).join("&");
  }
  static headers() {
    return {
      Accept: "application/json"
    };
  }
  static simpleFetch(endPoint, method, params) {
    let request = {
      method,
      headers: Helper.headers()
    };
    return fetch(`${Helper.baseURL()}${endPoint}?${Helper.auth()}&${Helper.urlBuilder(params)}`,request).then(response => response.json());
  }
}

export default class fourSquare {
  static search(params) {
    return Helper.simpleFetch("venues/search", "GET", params);
  }
  static getVenue(VENUE_ID) {
    return Helper.simpleFetch(`venues/${VENUE_ID}`,"GET");
  }
  static getPhotos(VENUE_ID) {
    return Helper.simpleFetch(`venues/${VENUE_ID}/photos`,"GET");
  }
}
