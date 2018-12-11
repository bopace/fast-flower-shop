import React from 'react'
import { arrayOf } from 'prop-types'
import DriverSchema from '../schemas/DriverSchema'
import OrderSchema from '../schemas/OrderSchema'
import Order from '../components/Order'

export default class ShopOrdersScreen extends React.PureComponent {
  static propTypes = {
    drivers: arrayOf(DriverSchema).isRequired,
    orders: arrayOf(OrderSchema).isRequired,
  }

  render() {
    return (
      <div>
        {this.renderOrders()}
      </div>
    )
  }

  renderOrders() {
    const { drivers, orders } = this.props

    if (orders.length === 0) {
      return (
        <h1>No orders... yet</h1>
      )
    }

    return (
      <div>
        <h1>Orders</h1>
        {orders.map(order => (
          <Order drivers={drivers} order={order} />
        ))}
      </div>
    )
  }
}
