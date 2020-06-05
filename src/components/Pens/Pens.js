import React, { Component } from 'react';
import AddPen from '../AddPen';
import { formatDay } from '../../utils/formatDate';

class Pens extends Component {
  state = {
    selectedPen: null
  }

  handlePenSelect = pen => {
    this.setState({ selectedPen: pen });
  }

  handleSubmit = (penData, isUpdate) => {
    if (isUpdate) this.setState({ selectedPen: null });
    this.props.handleSubmit(penData, isUpdate);
  }

  checkPenInked = pen => {
    return this.props.inkedPens.find(inkedPen => {
      return inkedPen.penId === pen.id && inkedPen.isActive;
    });
  }

  displayInk = penInked => {
    const currInk = this.props.inks.find(ink => ink.id === penInked.inkId);
    return `${currInk.brand} ${currInk.inkName} ${currInk.colorName} ${!currInk.isActive && '(retired)'}`;
  }

  render() {
    const {
      pens,
      handleSubmit,
      handleRemove,
      handleInking,
      handleCleaning
    } = this.props;
    const activePens = pens.filter(pen => pen.isActive);

    return (
      <>
        <h2>My Pens</h2>
        <ul>
          <li>
            <AddPen 
              selectedPen={this.state.selectedPen}
              handleSubmit={handleSubmit} />
          </li>
          <li>
            <div>Brand</div>
            <div>Model</div>
            <div>Finish Name</div>
            <div>Nib Type</div>
            <div>Nib Size</div>
            <div>Date Acquired</div>
            <div>Inked With</div>
          </li>
          {activePens.map(pen => {
            const penInked = this.checkPenInked(pen);

            return (
              <li key={pen.id}>
                <div>{pen.brand}</div>
                <div>{pen.model}</div>
                <div>{pen.finishName}</div>
                <div>{pen.nibType}</div>
                <div>{pen.nibSize}</div>
                <div>{formatDay(pen.dateAcquired.seconds)}</div>
                <button onClick={() => this.handlePenSelect(pen)}>Edit</button>
                <button onClick={() => handleRemove(pen.id)}>Remove</button>
                {!penInked &&
                  <button onClick={() => handleInking(pen)}>
                    Ink This Pen
                  </button>}
                {penInked &&
                  <>
                    <div>{this.displayInk(penInked)}</div>
                    <button onClick={() => handleCleaning(penInked)}>
                      Clean This Pen
                    </button>
                  </>}
              </li>
            );
          })}
        </ul>
      </>
    );
  }
}

export default Pens;