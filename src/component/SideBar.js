import React, { Component } from "react";
import VenueList from "./VenueList"
//referred from: https://www.youtube.com/watch?v=lDVaZY0aG2w&t=0s&list=PL4rQq4MQP1crXuPtruu_eijgOUUXhcUCP&index=7 
export default class SideBar extends Component {
    constructor() {
      super();
      this.state = {
        query: "",
        venues: []
      };
    }
    //handles Filtering of Markers and ListView 
    handleFilterVenues = () => {
      if(this.state.query.trim() !==""){
        const venues = this.props.venues.filter(venue => venue.name.toLowerCase().includes(this.state.query.toLowerCase()));
        return venues;
      }
      return this.props.venues;
    };
    //The change in search query is monitored and matched here
    handleChange = event => {
      this.setState({query: event.target.value});

      const markers = this.props.venues.map(venue => {
        const isMatched = venue.name.toLowerCase().includes(event.target.value.toLowerCase());
        const marker = this.props.markers.find(marker => marker.id === venue.id);
        if(isMatched) {
          marker.isVisible = true;
        }
        else{
          marker.isVisible = false;
        }
        return marker;
      });
      this.props.updateSuperState({markers});
    };
    //renders the sidebar which has all the list of food stall available in Salem, India
    render() {
      return (
        <div className="sideBar">
          <input type={"search"} tabIndex={0} id="search" placeholder="Search Places" onChange={this.handleChange}/>
          <VenueList {...this.props} venues={this.handleFilterVenues()} handleListItem={this.props.handleListItem} />
            <p style={{fontSize: "30px",fontWeight:"5px", fontStyle: "italic",color: "#524d5b"}}>
              Made with Love by Neha Sharma </p>
        </div>
      )
    }
}
