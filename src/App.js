import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import DriversScreenWrapper from './screens/DriversScreenWrapper'
import ShopOrdersScreenWrapper from './screens/ShopOrdersScreenWrapper'

// screens
const driversScreen = () => (
  <DriversScreenWrapper />
)

const shopOrdersScreen = () => (
  <ShopOrdersScreenWrapper />
)

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <div>
            <Link to='/drivers'>Delivery drivers</Link>
          </div>
          <div>
            <Link to='/orders'>Shop orders</Link>
          </div>

          <Route path='/drivers' exact
            component={driversScreen}
          />
          <Route path='/orders' exact
            component={shopOrdersScreen}
          />
        </div>
      </Router>
    )
  }
}
