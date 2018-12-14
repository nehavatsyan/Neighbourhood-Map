import React, { Component } from "react";
//exports the list rendered from given places from FourSquare
export default class ListView extends Component {
  onClickHandler = event => {
    if(event.key === "Enter" || event.type==="click") {
      this.props.handleListItem(this.props);
    }
  };
  render() {
    return (
      <li tabIndex={0} className="listView" role="listitem" onClick={this.onClickHandler}>{this.props.name}</li>
    )
  }
}
