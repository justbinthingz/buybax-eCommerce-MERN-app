// import './App.css';
// import Header from './components/Header'
// import Footer from './components/Footer'
// import HomeScreen from './screens/HomeScreen'
// import ProductScreen from './screens/ProductScreen'
// import { Container } from 'react-bootstrap'
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// const App = () => {
//   return (

//     <Router>
//       <Header />
//       <main className="py-3">
//         <Container>
//           <Route path="/product/:id" component={ProductScreen} />
//           <Route exact path="/" component={HomeScreen} />
//         </Container>
//       </main>
//       <Footer />
//     </Router>
//   );
// }

// export default App;


import React from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import { withRouter } from 'react-router-dom'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'


const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <main className='py-3'>
          <Container>
            <Switch>
              <Route exact path='/' component={HomeScreen} />
              <Route exact path='/shipping' component={ShippingScreen} />
              <Route exact path='/payment' component={PaymentScreen} />
              <Route exact path='/placeorder' component={PlaceOrderScreen} />
              <Route exact path='/order/:id' component={OrderScreen} />
              <Route exact path='/login' component={LoginScreen} ></Route>
              <Route exact path='/register' component={RegisterScreen} ></Route>
              <Route exact path='/profile' component={ProfileScreen} ></Route>
              <Route exact path='/product/:id' component={ProductScreen} ></Route>
              {/* here in cart id is optional */}
              <Route exact path='/cart/:id?' component={CartScreen} ></Route>
            </Switch>
          </Container>

        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
