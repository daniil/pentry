import React, { Component } from 'react';

const initState = {
  brand: '',
  model: '',
  finishName: '',
  nibType: '',
  nibSize: '',
  dateAcquired: ''
};

class AddPen extends Component {
  state = initState

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.handleSubmit(this.state);
    this.setState(initState);
  }

  render() {
    return (
      <form>
        <div>
          <input
            type="text"
            name="brand"
            placeholder="Brand"
            onChange={this.handleInputChange}
            value={this.state.brand} />
        </div>
        <div>
          <input
            type="text"
            name="model"
            placeholder="Model Name"
            onChange={this.handleInputChange}
            value={this.state.model} />
        </div>
        <div>
          <input
            type="text"
            name="finishName"
            placeholder="Finish Name"
            onChange={this.handleInputChange}
            value={this.state.finishName} />
        </div>
        <div>
          <input
            type="text"
            name="nibType"
            placeholder="Nib Type"
            onChange={this.handleInputChange}
            value={this.state.nibType} />  
        </div>
        <div>
          <input
            type="text"
            name="nibSize"
            placeholder="Nib Size"
            onChange={this.handleInputChange}
            value={this.state.nibSize} />
        </div>
        <div>
          <input
            type="date"
            name="dateAcquired"
            placeholder="Date Acquired"
            onChange={this.handleInputChange}
            value={this.state.dateAcquired} />
        </div>
        <button onClick={this.handleSubmit}>Add</button>
      </form>
    )
  }
}

export default AddPen;