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
        id: uuid(),
        state: DELIVERY_STATE.PREPARED,
        shopName: 'Bud\'s Flowers',
        shopAddress: '509 E 300 S, Salt Lake City, UT 84102',
        orderId: offer.orderId,
        driverName: offer.driverName,
        driverCellNumber: offer.driverCellNumber,
        customerCellNumber: order.userInfo.cellNumber,
        customerAddress: order.userInfo.address,
      }
    }
  }

  console.log('delivery event', createDeliveryEvent)

  return axios.post('/api/events', {
    event: createDeliveryEvent
  })
}
