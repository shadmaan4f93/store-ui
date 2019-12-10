import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import Modal from 'react-responsive-modal';
import { withRouter } from 'react-router-dom';

import { removeFromCart } from '../../Store/Cart';
import { calculateDiscountedPrice } from '../../Services/AppServices';
import LoginModal from '../Modals/LoginModal';
import './BarCart.css'

class BarCart extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        const { cookies } = this.props;
        let Token = cookies.get('token');
        this.state = {
            userToken: Token,
            cartTrayOpen: false
        }
    }

    toCartSummary = () => {
        this.props.history.push("/cart");
    }
    onOpenModal = () => {
        this.setState({ cartTrayOpen: true });
    };

    onCloseModal = () => {
        this.setState({ cartTrayOpen: false });
    };

    render() {
        const { cart: { cart, cartTotal, cartDiscount, cartTax }, removeFromCart } = this.props;
        const { cartTrayOpen } = this.state;
        return (
            <div className="cart-item">
                <div className="bor cart-det"><i className="flaticon-shopping-bag"></i> <h2 onClick={()=> this.props.history.push("/cart")}>My cart</h2></div>
                <div className="cart-item-hover">
                    {cart.length !== 0 ? (
                        <React.Fragment>
                            {cart.map(item => {
                                return (
                                    <div key={item.id} className="cart-item-list text-left">
                                        <img src={item.imageUrl} alt={item.name} />
                                        <a href="#"><h3>{item.name}</h3></a>
                                        <b onClick={() => removeFromCart(item.id)}>X</b>
                                        {
                                            item.sale ? (<p>{calculateDiscountedPrice(item.priceUs, item.discountAmount, item.discountPercentage)}<del>$ {item.priceUs}</del></p>) :
                                                (<p>$ {item.priceUs}</p>)
                                        }
                                    </div>
                                )
                            })}

                            <div className="border"></div>
                            {/* <div className="cart-total">
                                <h6>Discount</h6><p>{` $${cartDiscount}`}</p>
                                <div className="clearfix"></div>
                            </div>
                            <div className="cart-total">
                                <h6>Tax</h6><p>{` $${cartTax}`}</p>
                                <div className="clearfix"></div>

                            </div> */}
                            <div className="cart-total">
                                {/* <h6>Total Price</h6> <p>{`$${cartTotal}`}</p><div className="clearfix"></div> */}
                                {/* <a onClick={this.toCartSummary}  className="cart-view">View all</a> */}
                                <a onClick={this.toCartSummary} className="cart-checkout">Check out</a>
                            </div>
                        </React.Fragment>
                    ) : <div style={{ color: "black" }}>Your cart is empty</div>}
                </div>
                <Modal open={cartTrayOpen} onClose={this.onCloseModal} center>
                    <div>
                        <LoginModal />
                    </div>
                </Modal>
            </div >
        )
    }
}
const mapStateToProps = state => {
    return {
        cart: state.cart
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ removeFromCart }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withCookies(withRouter(BarCart)));
