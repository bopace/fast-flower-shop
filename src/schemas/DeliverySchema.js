import { PropTypes } from 'react-schema'

const { bool, shape, string } = PropTypes

export default shape({
  customerAddress: string.isRequired,
  customerCellNumber: string.isRequired,
  customerConfirmedDelivery: bool.isRequired,
  driverCellNumber: string.isRequired,
  driverConfirmedDelivery: bool.isRequired,
  driverName: string.isRequired,
  id: string.isRequired,
  orderId: string.isRequired,
  shopAddress: string.isRequired,
  shopName: string.isRequired,
  state: string.isRequired,
})
