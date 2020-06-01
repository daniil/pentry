import React, { Component } from 'react';
import AddInk from '../AddInk';

class Inks extends Component {
  render() {
    return (
      <>
        <h2>My Inks</h2>
        <ul>
          <li>
            <AddInk handleSubmit={this.props.handleSubmit} />
          </li>
          <li>
            <div>Brand</div>
            <div>Ink Name</div>
            <div>Color Name</div>
            <div>Type</div>
            <div>Size</div>
            <div>Hue</div>
            <div>Properties</div>
            <div>Date Acquired</div>
          </li>
          {this.props.inks.map(ink => {
            return (
              <li key={ink.id}>
                <div>{ink.brand}</div>
                <div>{ink.inkName}</div>
                <div>{ink.colorName}</div>
                <div>{ink.type}</div>
                <div>{ink.size}</div>
                <div>{ink.hue}</div>
                <div>{ink.props}</div>
                <div>{ink.dateAcquired.seconds}</div>
              </li>
            );
          })}
        </ul>
      </>
    )
  }
}

export default Inks;