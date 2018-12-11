import React from 'react'
import ShopOrdersScreen from './ShopOrdersScreen'

export default class ShopOrdersScreenWrapper extends React.PureComponent {
  state = {
    drivers: [],
    orders: [],
  }

  componentDidMount() {
    this.getDriversFromDb()
    this.interval = setInterval(() => this.getOrdersFromDb(), 500)
  }

  render() {
    const { drivers, orders } = this.state
    return (
      <ShopOrdersScreen
        drivers={drivers}
        orders={orders}
      />
    )
  }

  getDriversFromDb = () => {
    fetch('/api/getDrivers')
      .then(data => data.json())
      .then(res => {
        this.setState({ drivers: res.data })
      })
  }

  getOrdersFromDb = () => {
    fetch('/api/getOrders')
      .then(data => data.json())
      .then(res => {
        this.setState({ orders: res.data })
      })
  }
}
