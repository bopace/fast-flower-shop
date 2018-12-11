import axios from 'axios'
import uuid from 'uuid/v4'
import { OFFER_STATE } from '../../constants';

export default function createOffer(orderId, driver) {
  const createOfferEvent = {
    type: 'event',
    domain: 'offer',
    id: uuid(),
    attrs: {
      offer: {
        id: uuid(),
        state: OFFER_STATE.PLACED,
        shopName: 'The Cool Shop',
        shopAddress: '1234 Main Street',
        orderId: orderId,
        driverName: driver.name,
        driverCellNumber: driver.cellNumber,
      }
    }
  }

  console.log('createOfferEvent', createOfferEvent)

  // add twilio code here

  axios.post('/api/events', {
    event: createOfferEvent
  })
}
