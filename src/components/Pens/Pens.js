import React, { Component } from 'react';
import AddPen from '../AddPen';

class Pens extends Component {
  checkPenInked = pen => {
    const inkedHistory = this.props.inkedPens.filter(inkedPen => {
      return inkedPen.penId === pen.id;
    });

    if (!inkedHistory.length) return false;
    
    if (inkedHistory.length && !inkedHistory[inkedHistory.length - 1].isActive)
      return false;
    
    return inkedHistory[inkedHistory.length - 1];
  }

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
            const penInked = this.checkPenInked(pen);

            return (
              <li key={pen.id}>
                <div>{pen.brand}</div>
                <div>{pen.model}</div>
                <div>{pen.finishName}</div>
                <div>{pen.nibType}</div>
                <div>{pen.nibSize}</div>
                {!penInked &&
                  <button onClick={() => this.props.handlePenInking(pen)}>
                    Ink This Pen
                  </button>}
                {penInked &&
                  <button onClick={() => this.props.handlePenCleaning(penInked)}>
                    Clean This Pen
                  </button>}
              </li>
            );
          })}
        </ul>
      </>
    );
  }
}

export default Pens;