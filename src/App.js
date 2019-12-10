import React, { Component, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import axios from 'axios';
import { withCookies } from 'react-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';

import HomePage from './ViewsAndContainers/HomePage';
import Header from "./ViewsAndContainers/Header";
import Footer from "../src/Components/HomePageComponents/Footer";
import { fetchProducts } from "./Store/Products";
import { setUser } from "./Store/AppState";
import ProductDetails from "./ViewsAndContainers/ProductDetails";
import CheckOut from "./Components/CheckOut/CheckOut";
import ModalComponent from './Components/Modals/ModalComponent';
import Account from './Components/Account/Account';
import Spinner from './Components/Others/Spinner';
// import CartSummary from './Components/CheckOut/CartSummary';
const CartSummary = React.lazy(() => import('./Components/CheckOut/CartSummary'));


class AppContainer extends Component {

  componentDidMount() {
    let user = this.props.cookies.get('user');
    if (user) {
      this.props.setUser(user);
    }
    this.props.fetchProducts(0);
    // axios.get("https://moe-gifts-api.herokuapp.com/products/0").then(response => {
    //   this.props.setProducts(response.data.data);
    // }).catch(err => { console.log(err) });
  }

  render() {
    return (
      <div>
        <Header />
        {this.props.showSpinner &&
      
          <div className="spinner-bg">
            <Spinner />
          </div>
        }
        <Suspense fallback={<Spinner />}>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/product/:id" component={ProductDetails} />
            <Route path="/checkout" component={CheckOut} />
            <Route path="/cart" component={CartSummary} />
            <Route path="/account" component={Account} />
          </Switch>
        </Suspense>
        <Footer />
        <ModalComponent />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    showSpinner: state.state.showSpinner
  }
}
const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    fetchProducts, setUser
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withCookies(AppContainer));