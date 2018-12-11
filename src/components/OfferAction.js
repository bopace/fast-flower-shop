import React from 'react'
import { OFFER_STATE } from '../constants'
import { updateOffer } from '../events'
import OfferSchema from '../schemas/OfferSchema'

export default class OfferAction extends React.PureComponent {
  static propTypes = {
    offer: OfferSchema.isRequired,
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
    const { offer } = this.props

    updateOffer(offer, OFFER_STATE.CONFIRMED)
  }

  orderPrepared = () => {

  }
}
