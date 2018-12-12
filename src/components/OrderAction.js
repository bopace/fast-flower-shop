import React from 'react'
import { arrayOf } from 'prop-types'
import { ORDER_STATE } from '../constants'
import { updateOrder, createOffer } from '../events'
import OrderSchema from '../schemas/OrderSchema'
import DriverSchema from '../schemas/DriverSchema'
import DriversOffer from './DriversOffer'

export default class OrderAction extends React.PureComponent {
  static propTypes = {
    drivers: arrayOf(DriverSchema).isRequired,
    order: OrderSchema.isRequired,
  }

  render() {
    const { state } = this.props.order

    return (
      <div>
        <div>Status: <strong>{state}</strong></div>
        {this.renderAppropriateAction(state)}
      </div>
    )
  }

  renderAppropriateAction(status) {
    if (status === ORDER_STATE.PLACED) {
      return (
        <div>
          <button onClick={this.acceptOrder}>
            Accept order
          </button>
          <button onClick={this.rejectOrder}>
            Reject order
          </button>
        </div>
      )
    }

    if (status === ORDER_STATE.CANCELLED) {
      return (
        <div>The customer cancelled the order.</div>
      )
    }

    if (status === ORDER_STATE.ACCEPTED) {
      return (
        <div>
          <div>Offers have been made to the delivery drivers!</div>
          <DriversOffer order={this.props.order} />
        </div>
      )
    }

    if (status === ORDER_STATE.OUT_FOR_DELIVERY) {
      return (
        <div>
          <div>Your flowers will be delivered shortly!</div>
          <button onClick={this.confirmDelivery}>
            My flowers have been delivered!
          </button>
        </div>
      )
    }
  }

  acceptOrder = () => {
    const { order, drivers } = this.props

    updateOrder(order, ORDER_STATE.ACCEPTED)

    drivers.forEach(driver => {
      createOffer(order.id, driver)
    })
  }

  rejectOrder = () => {
    const { order } = this.props

    updateOrder(order, ORDER_STATE.REJECTED)
  }

  sendOutDelivery = () => {
    const { order } = this.props

    updateOrder(order, ORDER_STATE.OUT_FOR_DELIVERY)
  }
}
