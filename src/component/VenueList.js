import React, { Component } from "react";
import ListView from "./ListView"
//rendering of lists done here with Foursquare API
//Seperate VenueList component to render single sidebar with lists.
export default class VenueList extends Component {
  render() {
    return (
      <ol className="venueList">
        {this.props.venues && this.props.venues.map((venue,idx) => <ListView key={idx} {...venue} handleListItem={this.props.handleListItem} /> )}
      </ol>
    )
  }
}
