import React, { Component } from 'react';
import AddInk from '../AddInk';
import { formatDay } from '../../utils/formatDate';

class Inks extends Component {
  state = {
    selectedInk: null
  }

  handleInkSelect = ink => {
    this.setState({ selectedInk: ink });
  }

  handleSubmit = (inkData, isUpdate) => {
    if (isUpdate) this.setState({ selectedInk: null });
    this.props.handleSubmit(inkData, isUpdate);
  }

  handleCancel = () => {
    this.setState({ selectedInk: null });
  }

  render() {
    const { inks, handleRemove } =  this.props;
    const activeInks = inks.filter(ink => ink.isActive);

    return (
      <section>
        <h2>My Inks</h2>
        <ul>
          <li>
            <AddInk
              selectedInk={this.state.selectedInk}
              handleSubmit={this.handleSubmit}
              handleCancel={this.handleCancel} />
          </li>
          <li>
            <div>Brand</div>
            <div>Color Name</div>
            <div>Type</div>
            <div>Size</div>
            <div>Hue</div>
            <div>Properties</div>
            <div>Date Acquired</div>
          </li>
          {
          activeInks.map(ink => {
            return (
              <li key={ink.id}>
                <div>{ink.brand}</div>
                <div>{ink.colorName}</div>
                <div>{ink.type}</div>
                <div>{ink.size}</div>
                <div>{ink.hue}</div>
                <div>{ink.props}</div>
                <div>{formatDay(ink.dateAcquired.seconds)}</div>
                <button onClick={() => this.handleInkSelect(ink)}>Edit</button>
                <button onClick={() => handleRemove(ink.id)}>Remove</button>
              </li>
            );
          })}
        </ul>
      </section>
    )
  }
}

export default Inks;