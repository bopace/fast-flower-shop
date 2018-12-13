import React from 'react'
import { arrayOf } from 'prop-types'
import { ORDER_STATE, DELIVERY_STATE } from '../constants'
import { updateOrder, createOffer, updateDelivery } from '../events'
import DeliverySchema from '../schemas/DeliverySchema'
import DriverSchema from '../schemas/DriverSchema'
import OrderSchema from '../schemas/OrderSchema'
import DriversOffer from './DriversOffer'

export default class OrderAction extends React.PureComponent {
  static propTypes = {
    delivery: DeliverySchema,
    drivers: arrayOf(DriverSchema).isRequired,
    order: OrderSchema.isRequired,
  }

  static defaultProps = {
    delivery: null,
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

    if (status === ORDER_STATE.PREPARED) {
      return (
        <div>
          <div>The order is ready for delivery! Wait for the driver to come pick up the order.</div>
          <button onClick={this.confirmPickup}>
            Confirm pickup
          </button>
        </div>
      )
    }

    if (status === ORDER_STATE.OUT_FOR_DELIVERY || status === ORDER_STATE.DELIVERED) {
      return (
        <div>
          <div>The delivery is out!</div>
          {this.renderDriverDeliveryStatus()}
          {this.renderCustomerDeliveryStatus()}
        </div>
      )
    }
  }

  renderDriverDeliveryStatus() {
    const { delivery } = this.props
    if (delivery && delivery.driverConfirmedDelivery) {
      return (
        <div>The driver has made the delivery!</div>
      )
    }

    return (
      <div>The driver is on the way to make the delivery.</div>
    )
  }

  renderCustomerDeliveryStatus() {
    const { delivery } = this.props
    if (delivery && delivery.customerConfirmedDelivery) {
      return (
        <div>The customer has received the delivery!</div>
      )
    }

    return (
      <div>The customer is awaiting the delivery.</div>
    )
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

  confirmPickup = () => {
    const { order } = this.props

    updateDelivery(order.id, DELIVERY_STATE.PICKED_UP)
    updateOrder(order, ORDER_STATE.OUT_FOR_DELIVERY)
  }
}
