import React from 'react'
import ShopOrdersScreen from './ShopOrdersScreen'

export default class ShopOrdersScreenWrapper extends React.PureComponent {
  state = {
    orders: [],
  }

  componentDidMount() {
    this.interval = setInterval(() => this.getOrdersFromDb(), 500)
  }

  render() {
    const { orders } = this.state
    return (
      <ShopOrdersScreen
        orders={orders}
      />
    )
  }

  getOrdersFromDb = () => {
    fetch('/api/getOrders')
      .then(data => data.json())
      .then(res => {
        this.setState({ orders: res.data })
      })
  }
}
