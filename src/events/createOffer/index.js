import axios from 'axios'
import uuid from 'uuid/v4'
import { OFFER_STATE } from '../../constants'

export default function createOffer(orderId, driver) {
  const createOfferEvent = {
    type: 'event',
    domain: 'offer',
    id: uuid(),
    attrs: {
      offer: {
        id: uuid(),
        state: OFFER_STATE.PLACED,
        shopName: 'Bud\'s Flowers',
        shopAddress: '509 E 300 S, Salt Lake City, UT 84102',
        orderId: orderId,
        driverName: driver.name,
        driverCellNumber: driver.cellNumber,
      }
    }
  }

  axios.post('/api/events', {
    event: createOfferEvent
  })
}
