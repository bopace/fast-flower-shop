import axios from 'axios'
import uuid from 'uuid/v4'

export default function updateOffer(offer, newState) {
  const updatedOffer = {
    ...offer,
    state: newState
  }

  const updateOfferEvent = {
    type: 'event',
    domain: 'offer',
    id: uuid(),
    attrs: {
      offer: updatedOffer
    }
  }

  axios.post('/api/events', {
    event: updateOfferEvent,
  })
}
