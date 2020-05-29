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

  render() {
    const { brand, model } = this.props.pen;

    return (
      <>
        <p>{brand} {model}</p>
        <select onChange={this.handleInkChange} value={this.state.inkChoice}>
          <option value=""></option>
          {this.props.inks.map(ink => {
            return (
              <option key={ink.id} value={ink.id}>
                {ink.brand} {ink.inkName} {ink.colorName}
              </option>
            );
          })}
        </select>
        <button
          onClick={() => this.props.handleInkChoice(this.props.pen.id, this.state.inkChoice)}>
          Use This Ink
        </button>
      </>
    );
  }
}

export default InkPen;