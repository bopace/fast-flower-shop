import React from 'react'
import axios from 'axios'
import { func } from 'prop-types'
import { OFFER_STATE } from '../constants'
import { createDelivery, updateOffer } from '../events'
import OfferSchema from '../schemas/OfferSchema'
import OrderSchema from '../schemas/OrderSchema'

export default class OfferAction extends React.PureComponent {
  static propTypes = {
    offer: OfferSchema.isRequired,
    order: OrderSchema.isRequired,
    selectAnOffer: func.isRequired,
  }

  render() {
    const { state } = this.props.offer

    return (
      <div>
        <div>Status: <strong>{state}</strong></div>
        {this.renderAppropriateAction(state)}
      </div>
    )
  }

  renderAppropriateAction(status) {
    if (status === OFFER_STATE.PLACED) {
      return (
        <div>
          <div>Waiting to hear back from driver. Sit tight.</div>
          <button onClick={this.revokeOffer}>
            Revoke offer
          </button>
        </div>
      )
    }

    if (status === OFFER_STATE.ACCEPTED) {
      return (
        <div>
          <div>The driver accepted the offer!</div>
          <button onClick={this.confirmOffer}>
            Confirm offer
          </button>
        </div>
      )
    }

    if (status === OFFER_STATE.REJECTED) {
      return (
        <div>The driver rejected the offer.</div>
      )
    }

    if (status === OFFER_STATE.CONFIRMED) {
      return (
        <div>
          <div>Time to prepare the order for delivery!</div>
          <button onClick={this.orderPrepared}>
            Order prepared
          </button>
        </div>
      )
    }
  }

  revokeOffer = () => {
    const { offer } = this.props

    updateOffer(offer, OFFER_STATE.REVOKED)
  }

  confirmOffer = () => {
    const { offer, selectAnOffer } = this.props

    updateOffer(offer, OFFER_STATE.CONFIRMED)

    // reject all other offers
    selectAnOffer(offer.id)
  }

  orderPrepared = () => {
    const { offer, order } = this.props


    createDelivery(offer, order).then(() => {
      // delete all offers related to this order
      axios.post('/api/deleteOffers', {
        orderId: order.id,
      })
    })
  }
}
