import React, { Component } from 'react';
import './App.css';
import Map from "./component/Map"
import fourSquare from "./API/"
import SideBar from "./component/SideBar"
import Error from "./Error";
class App extends Component {
  constructor() {
    super();
    this.state = {
      venues: [],
      markers: [],
      center: [],
      zoom: 12,
      updateSuperState: obj => {
        this.setState(obj);
      }
    }
  }
  closeAllMarkers = () => {
    const markers =this.state.markers.map(marker => {
      marker.isOpen = false;
      return marker;
    })
    this.setState({
      markers: Object.assign(this.state.markers,markers)
    })
  }
  /*Referred from coursework InfoWindow https://github.com/udacity/ud864/blob/master/Project_Code_3_WindowShoppingPart1.html*/
  //Markers are handled along with the venues selected in ListView
  handleMarker = (marker) => {
    this.closeAllMarkers();
    marker.isOpen = true;
    this.setState({markers: Object.assign(this.state.markers, marker)}); //Object.assign helps Copying Marker into the state. Referred: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
    const venue = this.state.venues.find(venue => venue.id === marker.id);
    fourSquare.getVenue(marker.id)
      .then(res => {
       const newVenue =  Object.assign(venue, res.response.venue);
       this.setState({venues: Object.assign(this.state.venues, newVenue)});
      })
  }
//Venue list is filtered here
  handleListItem = venue => {
    const marker = this.state.markers.find(marker => marker.id === venue.id);
    this.handleMarker(marker);
  }
  //authFailure is catched here if any
  authFailure = (error) => {
    this.setState({
      errorDisplay: error
    });
  }
  //Marker Positions are fetched Async from FourSquare and catches error helps to display in the UI
  componentDidMount() {
    fourSquare.search({
      near: "Jalandhar, IN",  
      query: "food",
      limit: 20
    }).then(results => {
      const { venues } = results.response;
      const { center } = results.response.geocode.feature.geometry; /* Destructuring the constructor with this syntax */
      const markers = venues.map(venue => {
        return {
          lat: venue.location.lat,
          lng: venue.location.lng,
          isOpen: false,
          isVisible: true,
          id: venue.id
        };
      });
      this.setState({ venues, center, markers });
    }).catch(err => {
      new Error(console.log(err));
        this.setState(prevState => ({
          errorDisplay: prevState.errorDisplay.length === 0 ? err.toString() : prevState.errorDisplay
        }));
    });
  }
  render() {
    return (
      <div className="App" role="application">
          {console.log(this.state.errorDisplay)}
          {this.state.errorDisplay && (
            <Error errorDisplay={this.state.errorDisplay} />  //checks for error if any to show up in the console
          )}
          <SideBar {...this.state} handleListItem={this.handleListItem}/>
          <Map role="main" {...this.state} authFailure = {this.authFailure} handleMarker={this.handleMarker}/>
      </div>
    );
  }
}

export default App;
