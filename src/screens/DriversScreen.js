import React from 'react'
import { arrayOf, func } from 'prop-types'
import DriverSchema from '../schemas/DriverSchema'
import Driver from '../components/Driver'

export default class DriversScreen extends React.PureComponent {
  static propTypes = {
    addDriver: func.isRequired,
    deleteDriver: func.isRequired,
    drivers: arrayOf(DriverSchema).isRequired,
  }

  state = {
    name: '',
    cellNumber: '',
  }

  render() {
    return (
      <div>
        {this.renderDrivers()}
        {this.renderAddDriverForm()}
      </div>
    )
  }

  renderDrivers() {
    const { drivers, deleteDriver } = this.props

    if (drivers.length === 0) {
      return (
        <div>No drivers... yet</div>
      )
    }

    return (
      <div>
        {drivers.map(driver => (
          <Driver
            key={driver.id}
            onDelete={deleteDriver}
            driverId={driver.id}
            driverName={driver.name}
            driverCellNumber={driver.cellNumber}
          />
        ))}
      </div>
    )
  }

  renderAddDriverForm() {
    return (
      <div>
        <input
          type='text'
          onChange={this.updateName}
          placeholder='Driver name'
          value={this.state.name}
        />
        <input
          type='text'
          onChange={this.updateCellNumber}
          placeholder='Driver cell number'
          value={this.state.cellNumber}
        />
        <button onClick={this.addDriver}>
          Add driver
        </button>
      </div>
    )
  }

  updateName = e => this.setState({ name: e.target.value })
  updateCellNumber = e => this.setState({ cellNumber: e.target.value })
  addDriver = () => {
    const { name, cellNumber } = this.state
    this.setState({
      name: '',
      cellNumber: '',
    })
    this.props.addDriver(name, cellNumber)
  }
}
