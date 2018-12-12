export const ORDER_STATE = {
  PLACED: 'ORDER_PLACED',
  CANCELLED: 'ORDER_CANCELLED',
  ACCEPTED: 'ORDER_ACCEPTED',
  REJECTED: 'ORDER_REJECTED',
  OUT_FOR_DELIVERY: 'ORDER_OUT_FOR_DELIVERY',
  DELIVERED: 'ORDER_DELIVERED',
}

export const OFFER_STATE = {
  PLACED: 'OFFER_PLACED',
  REVOKED: 'OFFER_REVOKED',
  ACCEPTED: 'OFFER_ACCEPTED',
  REJECTED: 'OFFER_REJECTED',
  CONFIRMED: 'OFFER_CONFIRMED',
}

export const DELIVERY_STATE = {
  PREPARED: 'DELIVERY_PREPARED',
  PICKED_UP: 'DELIVERY_PICKED_UP',
  FIVE_MINUTES_AWAY: 'DELIVERY_FIVE_MINUTES_AWAY',
  ARRIVED: 'DELIVERY_ARRIVED',
  COMPLETED: 'DELIVERY_COMPLETED',
  CONFIRMED: 'DELIVERY_CONFIRMED',
}
