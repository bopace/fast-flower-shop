import axios from 'axios'
import uuid from 'uuid/v4'

export default function updateDelivery(delivery, newState) {
  const updatedDelivery = {
    ...delivery,
    state: newState
  }

  const updateDeliveryEvent = {
    type: 'event',
    domain: 'delivery',
    id: uuid(),
    attrs: {
      delivery: updatedDelivery
    }
  }

  axios.post('/api/events', {
    event: updateDeliveryEvent,
  })
}
