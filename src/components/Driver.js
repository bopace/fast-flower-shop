import React from 'react'
import { func, string } from 'prop-types'

export default class Driver extends React.PureComponent {
  static propTypes = {
    onDelete: func.isRequired,
    driverId: string.isRequired,
    driverName: string.isRequired,
    driverCellNumber: string.isRequired,
  }

  render() {
    const { driverName, driverCellNumber } = this.props
    return (
      <div>
        <div>{driverName}</div>
        <div>{driverCellNumber}</div>
        <button onClick={this.deleteDriver}>
          Delete driver
        </button>
      </div>
    )
  }

  deleteDriver = () => {
    const { onDelete, driverId } = this.props
    onDelete(driverId)
  }
}
