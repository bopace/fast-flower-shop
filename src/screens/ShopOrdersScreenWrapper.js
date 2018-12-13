import React from 'react'
import ShopOrdersScreen from './ShopOrdersScreen'

export default class ShopOrdersScreenWrapper extends React.PureComponent {
  state = {
    deliveries: [],
    drivers: [],
    orders: [],
  }

  componentDidMount() {
    this.getDriversFromDb()
    this.interval = setInterval(() => {
      this.getDeliveriesFromDb()
      this.getOrdersFromDb()
    }, 500)
  }

  render() {
    const { deliveries, drivers, orders } = this.state
    return (
      <ShopOrdersScreen
        deliveries={deliveries}
        drivers={drivers}
        orders={orders}
      />
    )
  }

  getDeliveriesFromDb = () => {
    fetch('/api/getDeliveries')
      .then(data => data.json())
      .then(res => {
        this.setState({ deliveries: res.data })
      })
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
