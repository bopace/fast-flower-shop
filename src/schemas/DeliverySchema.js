import { PropTypes } from 'react-schema'

const { shape, string } = PropTypes

export default shape({
  id: string.isRequired,
  state: string.isRequired,
  shopName: string.isRequired,
  shopAddress: string.isRequired,
  orderId: string.isRequired,
  driverName: string.isRequired,
  driverCellNumber: string.isRequired,
  customerCellNumber: string.isRequired,
  customerAddress: string.isRequired,
})
