import React, { Component } from 'react';
import AutosuggestField from '../AutosuggestField';
import { formatDay } from '../../utils/formatDate';
import { trimObjValues } from '../../utils/formatData';
import fieldDeps from '../../utils/fieldDependencies';

const initState = {
  id: null,
  brand: '',
  model: '',
  finishName: '',
  nibType: '',
  nibSize: '',
  dateAcquired: ''
};

class AddPen extends Component {
  state = initState

  componentDidUpdate(prevProps) {
    if (this.newPenDataPassed(prevProps)) {
      const { selectedPen: {
        id, brand, model, finishName, nibType, nibSize, dateAcquired
      } } = this.props;

      this.setState({
        id, brand, model, finishName, nibType, nibSize,
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
    this.props.handleSubmit(this.cleanSubmitData(), !!this.props.selectedPen);
    this.setState(initState);
  }

  newPenDataPassed = prevProps => {
    return this.props.selectedPen &&
      (!prevProps.selectedPen ||
      prevProps.selectedPen.id !== this.props.selectedPen.id);
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
          type="pen:brand"
          value={this.state.brand}
          onChange={this.handleFieldChange} />
        <AutosuggestField
          label="Model Name"
          type="pen:model"
          value={this.state.model}
          dependency={{ type: fieldDeps.pen.model, value: this.state.brand }}
          onChange={this.handleFieldChange} />
        <AutosuggestField
          label="Finish Name"
          type="pen:finishName"
          value={this.state.finishName}
          dependency={{
            type: fieldDeps.pen.finishName,
            value: [this.state.brand, this.state.model]
          }}
          onChange={this.handleFieldChange} />
        <AutosuggestField
          label="Nib Material"
          type="pen:nibType"
          value={this.state.nibType}
          onChange={this.handleFieldChange} />
        <AutosuggestField
          label="Nib Size"
          type="pen:nibSize"
          value={this.state.nibSize}
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
          {this.props.selectedPen ? 'Update' : 'Add'}
        </button>
      </form>
    )
  }
}

export default AddPen;