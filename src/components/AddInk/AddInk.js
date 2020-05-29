import React, { Component } from 'react';

class AddInk extends Component {
  state = {
    brand: '',
    name: '',
    type: '',
    size: '',
    hue: '',
    props: ''
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.handleSubmit(this.state);
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
            name="name"
            placeholder="Name"
            onChange={this.handleInputChange}
            value={this.state.name} />
        </div>
        <div>
          <input
            type="text"
            name="type"
            placeholder="Type"
            onChange={this.handleInputChange}
            value={this.state.type} />  
        </div>
        <div>
          <input
            type="text"
            name="size"
            placeholder="Size"
            onChange={this.handleInputChange}
            value={this.state.size} />
        </div>
        <div>
          <input
            type="text"
            name="hue"
            placeholder="Hue"
            onChange={this.handleInputChange}
            value={this.state.hue} />  
        </div>
        <div>
          <input
            type="text"
            name="props"
            placeholder="Properties"
            onChange={this.handleInputChange}
            value={this.state.props} />  
        </div>
        <button onClick={this.handleSubmit}>Add</button>
      </form>
    )
  }
}

export default AddInk;