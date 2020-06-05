import React, { Component } from 'react';
import { formatDay } from '../../utils/formatDate';

class InkedPens extends Component {
  getCurrentlyInked = () => {
    const { inkedPens } = this.props;
    return inkedPens.filter(inking => inking.isActive);
  }

  renderPen = penId => {
    const { pens } = this.props;
    const currPen = pens.find(pen => pen.id === penId);

    return (
      <>{currPen.brand} {currPen.model} {currPen.finishName}</>
    );
  }

  renderInk = inkId => {
    const { inks } = this.props;
    const currInk = inks.find(ink => ink.id === inkId);

    return (
      <>{currInk.brand} {currInk.inkName} {currInk.colorName}</>
    );
  }

  render() {
    const currentlyInked = this.getCurrentlyInked();

    return (
      <>
        <h2>Inked Pens</h2>
        <ul>
          <li>
            <div>Pen</div>
            <div>Ink</div>
            <div>Inked Since</div>
          </li>
          {currentlyInked.map(inking => {
            return <li key={inking.id}>
              <div>{this.renderPen(inking.penId)}</div>
              <div>{this.renderInk(inking.inkId)}</div>
              <div>{formatDay(inking.dateInked.seconds)}</div>
            </li>;
          })}
        </ul>
      </>
    );
  }
}

export default InkedPens;