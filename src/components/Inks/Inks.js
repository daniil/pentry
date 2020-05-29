import React, { Component } from 'react';
import AddInk from '../AddInk';

class Inks extends Component {
  handleSubmit = inkData => {
    console.log('Add new ink', inkData);
  }

  render() {
    return (
      <>
        <h2>My Inks</h2>
        <ul>
          <li>
            <AddInk handleSubmit={this.handleSubmit} />
          </li>
          <li>
            <div>Brand</div>
            <div>Name</div>
            <div>Type</div>
            <div>Size</div>
            <div>Hue</div>
            <div>Properties</div>
          </li>
          {this.props.inks.map(ink => {
            return (
              <li>
                <div>{ink.brand}</div>
                <div>{ink.name}</div>
                <div>{ink.type}</div>
                <div>{ink.size}</div>
                <div>{ink.hue}</div>
                <div>{ink.props}</div>
              </li>
            );
          })}
        </ul>
      </>
    )
  }
}

export default Inks;