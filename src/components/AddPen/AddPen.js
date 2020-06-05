import React, { Component } from 'react';
import { formatDay } from '../../utils/formatDate';

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

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
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
    if (this.state.id) return this.state;
    const { id, ...cleanState } = this.state;
    return cleanState;
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
        <button onClick={this.handleSubmit}>
          {this.props.selectedPen ? 'Update' : 'Add'}
        </button>
      </form>
    )
  }
}

export default AddPen;