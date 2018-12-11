import React from 'react'
import { string } from 'prop-types'

export default class DriversOffer extends React.PureComponent {
  static propTypes = {
    orderId: string.isRequired,
  }

  state = {
    offers: [],
  }

  componentDidMount() {
    this.getOffersFromDb()
  }

  render() {
    return (
      <div>
        {this.renderOffers()}
      </div>
    )
  }

  renderOffers() {
    const { offers } = this.state
    if (offers.length === 0) {
      return (
        <div>Loading offers...</div>
      )
    }

    return (
      <div>
        {offers.map(offer => this.renderOffer(offer))}
      </div>
    )
  }

  renderOffer(offer) {
    return (
      <div>
        <br />
        <div>Driver: <strong>{offer.driverName}</strong></div>
        <div>Status: <strong>{offer.state}</strong></div>
        {this.renderOfferAction()}
      </div>
    )
  }

  renderOfferAction() {
    return <div>coming soon</div>
  }

  getOffersFromDb = () => {
    const { orderId } = this.props
    fetch(`/api/getOffers/${orderId}`)
      .then(data => data.json())
      .then(res => {
        this.setState({ offers: res.data })
      })
  }
}
