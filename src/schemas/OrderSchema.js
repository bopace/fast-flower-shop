import { PropTypes } from 'react-schema'
import UserInfoSchema from '../schemas/UserInfoSchema'

const { arrayOf, shape, string } = PropTypes

export default shape({
  id: string.isRequired,
  state: string.isRequired,
  items: arrayOf(shape({
    name: string,
    quantity: string,
  })).isRequired,
  specialInstructions: string.isRequired,
  shopId: string.isRequired,
  shopName: string.isRequired,
  shopUrl: string.isRequired,
  userInfo: UserInfoSchema.isRequired,
})
