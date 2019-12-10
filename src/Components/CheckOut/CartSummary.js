import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withCookies, Cookies } from 'react-cookie';

import { incrementItem, decrementItem, removeFromCart } from '../../Store/Cart';
import { showModal, MODALS } from '../../Store/AppState';
import './Checkout.css';

class CartSummary extends Component {
    
    toCheckout = () => {
        if (this.props.cookies.get('token')) {
            this.props.history.push("/checkout");
        }
        else {
            this.props.showModal(MODALS.LOGIN);
        }
    }

    render() {
        const {
            cart,
            cartSubtotal,
            cartTax,
            cartTotal,
            cartDiscount,
            incrementItem,
            decrementItem,
            removeFromCart
        } = this.props;
        return (
            <>{cart.length > 0 ?
                <div className="cart-summary">
                    <div className="cart-summary-header">Cart summary</div>
                    <div>
                        <table >
                            <thead >
                                <tr>
                                    <th></th>
                                    <th>Item Name</th>
                                    <th>Item Qty</th>
                                    <th>Item Price</th>
                                    <th>Item Total</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map(item => {
                                    return <tr key={item.id}>
                                        <td>
                                            <img src={item.imageUrl} alt={item.name} />
                                        </td>
                                        <td>{item.name}</td>
                                        <td><i onClick={() => decrementItem(item)} className="fa fa-minus" aria-hidden="true"></i>{item.inCartCount}<i onClick={() => incrementItem(item.id)} className="fa fa-plus" aria-hidden="true"><i onClick={() => removeFromCart(item.id)} className="far fa-trash-alt"></i></i></td>
                                        <td>{item.priceUs}</td>
                                        <td>{item.itemTotal}</td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                        <hr />
                        <div>
                            <table>
                                <tr>
                                    <td>Cart SubTotal: {cartSubtotal}</td>
                                    <td>Discount: {cartDiscount}</td>
                                    <td>Taxes: {cartTax}</td>
                                    <td><strong>Total: {cartTotal}</strong></td>
                                    <td>  <button onClick={this.toCheckout} className="cart-summary-btn">Confirm your order</button></td>
                                </tr>
                            </table>
                         
                        </div>
                        <hr />
                      
                    </div>
                </div> :
                <div>
                    <h1>Your cart is empty</h1>
                    <button type="button" onClick={() => this.props.history.goBack()}>Go back</button>
                </div>}
            </>
        )
    }
}
const mapStateToProps = state => {
    return {
        cart: state.cart.cart,
        cartSubtotal: state.cart.cartSubtotal,
        cartTax: state.cart.cartTax,
        cartTotal: state.cart.cartTotal,
        cartDiscount: state.cart.cartDiscount
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators({ incrementItem, decrementItem, removeFromCart, showModal }, dispatch);
}
export default withCookies(connect(mapStateToProps, mapDispatchToProps)(CartSummary));
