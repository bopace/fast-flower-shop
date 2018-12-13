import axios from 'axios'
import uuid from 'uuid/v4'
import { DELIVERY_STATE } from '../../constants'

export default function createDelivery(offer, order) {
  const createDeliveryEvent = {
    type: 'event',
    domain: 'delivery',
    id: uuid(),
    attrs: {
      delivery: {
        customerAddress: order.userInfo.address,
        customerCellNumber: order.userInfo.cellNumber,
        customerConfirmedDelivery: false,
        driverCellNumber: offer.driverCellNumber,
        driverConfirmedDelivery: false,
        driverName: offer.driverName,
        id: uuid(),
        orderId: offer.orderId,
        shopAddress: '509 E 300 S, Salt Lake City, UT 84102',
        shopName: 'Bud\'s Flowers',
        state: DELIVERY_STATE.PREPARED,
      }
    }
  }

  console.log('delivery event', createDeliveryEvent)

  return axios.post('/api/events', {
    event: createDeliveryEvent
  })
}
