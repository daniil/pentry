import React, { Component } from 'react';

class InkPen extends Component {
  state = {
    inkChoice: ''
  }

  handleInkChange = e => {
    this.setState({
      inkChoice: e.target.value
    });
  }

  inkUseCount = ink => {
    const { inkedPens } = this.props;
    return inkedPens.filter(inkedPen => {
      return inkedPen.isActive && inkedPen.inkId === ink.id;
    }).length;
  }

  render() {
    const { pen: { brand, model }, inks, handleInkChoice } = this.props;

    return (
      <>
        <p>{brand} {model}</p>
        <select onChange={this.handleInkChange} value={this.state.inkChoice}>
          <option value=""></option>
          {inks.map(ink => {
            const useCount = this.inkUseCount(ink);
            return (
              <option key={ink.id} value={ink.id}>
                {ink.brand} {ink.colorName}
                {!!useCount && `(${useCount})`}
              </option>
            );
          })}
        </select>
        <button
          onClick={() => handleInkChoice(this.props.pen.id, this.state.inkChoice)}>
          Use This Ink
        </button>
      </>
    );
  }
}

export default InkPen;