import React, { Component } from 'react';
import AutosuggestField from '../AutosuggestField';
import { formatDay } from '../../utils/formatDate';
import { trimObjValues } from '../../utils/formatData';
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

  handleFieldChange = fieldVal => {
    const isHTMLInput = 'target' in fieldVal;
    const fieldKey = isHTMLInput ? fieldVal.target.name : fieldVal.key;
    const fieldValue = isHTMLInput ? fieldVal.target.value : fieldVal.value;

    this.setState({
      [fieldKey]: fieldValue
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
    if (this.state.id) return trimObjValues(this.state);
    const { id, ...cleanState } = this.state;
    return trimObjValues(cleanState);
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
        <AutosuggestField
          label="Type"
          type="ink:type"
          value={this.state.type}
          onChange={this.handleFieldChange} />
        <AutosuggestField
          label="Size"
          type="ink:size"
          value={this.state.size}
          onChange={this.handleFieldChange} />
        <AutosuggestField
          label="Color Hue"
          type="ink:hue"
          value={this.state.hue}
          onChange={this.handleFieldChange} />
        <AutosuggestField
          label="Special Properties"
          type="ink:props"
          value={this.state.props}
          onChange={this.handleFieldChange} />
        <div>
          <input
            type="date"
            name="dateAcquired"
            placeholder="Date Acquired"
            onChange={this.handleFieldChange}
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