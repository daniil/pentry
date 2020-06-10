import React, { Component } from 'react';
import AutosuggestField from '../AutosuggestField';
import { formatDay } from '../../utils/formatDate';
import fieldDeps from '../../utils/fieldDependencies';

const initState = {
  id: null,
  brand: '',
  colorName: '',
  type: '',
  size: '',
  hue: '',
  props: '',
  dateAcquired: ''
};

class AddInk extends Component {
  state = initState

  componentDidUpdate(prevProps) {
    if (this.newInkDataPassed(prevProps)) {
      const { selectedInk: {
        id, brand, colorName, type, size, hue, props, dateAcquired
      } } = this.props;

      this.setState({
        id, brand, colorName, type, size, hue, props,
        dateAcquired: formatDay(dateAcquired.seconds)
      });
    }
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleFieldChange = fieldVal => {
    this.setState({
      [fieldVal.key]: fieldVal.value
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.handleSubmit(this.cleanSubmitData(), !!this.props.selectedInk);
    this.setState(initState);
  }

  newInkDataPassed = prevProps => {
    return this.props.selectedInk &&
      (!prevProps.selectedInk ||
      prevProps.selectedInk.id !== this.props.selectedInk.id);
  }

  cleanSubmitData = () => {
    if (this.state.id) return this.state;
    const { id, ...cleanState } = this.state;
    return cleanState;
  }

  render() {
    return (
      <form>
        <AutosuggestField
          label="Brand"
          type="ink:brand"
          value={this.state.brand}
          onChange={this.handleFieldChange} />
        <AutosuggestField
          label="Color Name"
          type="ink:colorName"
          value={this.state.colorName}
          dependency={{ type: fieldDeps.ink.colorName, value: this.state.brand }}
          onChange={this.handleFieldChange} />
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
        <div>
          <input
            type="date"
            name="dateAcquired"
            placeholder="Date Acquired"
            onChange={this.handleInputChange}
            value={this.state.dateAcquired} />  
        </div>
        <button onClick={this.handleSubmit}>
          {this.props.selectedInk ? 'Update' : 'Add'}
        </button>
      </form>
    )
  }
}

export default AddInk;