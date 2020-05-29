import React, { Component } from 'react';
import AddPen from '../AddPen';

class Pens extends Component {
  render() {
    return (
      <>
        <h2>My Pens</h2>
        <ul>
          <li>
            <AddPen handleSubmit={this.props.handleSubmit} />
          </li>
          <li>
            <div>Brand</div>
            <div>Model</div>
            <div>Finish Name</div>
            <div>Nib Type</div>
            <div>Nib Size</div>
          </li>
          {this.props.pens.map(pen => {
            return (
              <li key={pen.id}>
                <div>{pen.brand}</div>
                <div>{pen.model}</div>
                <div>{pen.finishName}</div>
                <div>{pen.nibType}</div>
                <div>{pen.nibSize}</div>
                <button onClick={() => this.props.handlePenInking(pen)}>
                  Ink This Pen
                </button>
              </li>
            );
          })}
        </ul>
      </>
    );
  }
}

export default Pens;