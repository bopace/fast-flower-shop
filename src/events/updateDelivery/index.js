import axios from 'axios'
import uuid from 'uuid/v4'

export default function updateDelivery(orderId, newState) {
  fetch(`api/getDelivery/${orderId}`)
    .then(data => data.json())
    .then(res => {
      const delivery = res.data
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
    })
}
