import React from 'react'
import axios from 'axios'
import DriversScreen from './DriversScreen'
import { formatDriverData } from '../utils'

export default class DriversScreenWrapper extends React.PureComponent {
  state = {
    drivers: [],
  }

  componentDidMount() {
    this.getDriversFromDb()
  }

  render() {
    const { drivers } = this.state
    return (
      <div>
        <DriversScreen
          addDriver={this.addDriverToDb}
          deleteDriver={this.deleteDriverFromDB}
          drivers={drivers}
        />
      </div>
    )
  }

  getDriversFromDb = () => {
    fetch('/api/getDrivers')
      .then(data => data.json())
      .then(res => {
        const formattedData = formatDriverData(res.data)
        this.setState({ drivers: formattedData })
      })
  }

  addDriverToDb = (name, cellNumber) => {
    axios.post('/api/addDriver', {
      name: name,
      cellNumber: cellNumber,
    }).then(() => this.getDriversFromDb())
  }

  deleteDriverFromDB = id => {
    axios.delete('/api/deleteDriver', {
      data: {
        id: id
      }
    }).then(() => this.getDriversFromDb())
  }
}
