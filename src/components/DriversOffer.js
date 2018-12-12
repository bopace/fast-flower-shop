import React from 'react'
import OfferAction from './OfferAction'
import { updateOffer } from '../events'
import { OFFER_STATE } from '../constants'
import OrderSchema from '../schemas/OrderSchema'

export default class DriversOffer extends React.PureComponent {
  static propTypes = {
    order: OrderSchema.isRequired,
  }

  state = {
    offers: [],
  }

  componentDidMount() {
    this.interval = setInterval(() => this.getOffersFromDb(), 500)
  }

  render() {
    return (
      <div>
        {this.renderOffers()}
      </div>
    )
  }

  renderOffers() {
    const { order } = this.props
    const { offers } = this.state
    if (offers.length === 0) {
      return (
        <div>Loading offers...</div>
      )
    }

    return (
      <div>
        {offers.map(offer => this.renderOffer(offer, order))}
      </div>
    )
  }

  renderOffer(offer, order) {
    return (
      <div>
        <br />
        <div>Driver: <strong>{offer.driverName}</strong></div>
        <OfferAction offer={offer} order={order} selectAnOffer={this.selectAnOffer} />
      </div>
    )
  }

  renderOfferAction(offer) {
    if (offer.state === OFFER_STATE.PLACED) {

    }
  }

  getOffersFromDb = () => {
    const { order } = this.props
    fetch(`/api/getOffers/${order.id}`)
      .then(data => data.json())
      .then(res => {
        this.setState({ offers: res.data })
      })
  }

  selectAnOffer = offerId => {
    const { offers } = this.state
    offers.forEach(offer => {
      if (offer.id !== offerId) {
        updateOffer(offer, OFFER_STATE.REVOKED)
      }
    })
  }
}
