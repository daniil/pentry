import React, { Component } from 'react';

class AddInk extends Component {
  state = {
    brand: '',
    inkName: '',
    colorName: '',
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
            name="inkName"
            placeholder="Ink Name"
            onChange={this.handleInputChange}
            value={this.state.inkName} />
        </div>
        <div>
          <input
            type="text"
            name="colorName"
            placeholder="Color Name"
            onChange={this.handleInputChange}
            value={this.state.colorName} />
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