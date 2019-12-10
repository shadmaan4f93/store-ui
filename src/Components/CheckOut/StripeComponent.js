import React, { Component } from 'react'
import { CardNumberElement, CardExpiryElement, CardCvcElement, injectStripe } from 'react-stripe-elements';

import axios from '../../Services/Axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router'
import { clearCart } from '../../Store/Cart';

class StripeComponent extends Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
        this.state = {
            paymentStatus: false,
            name: ""
        }
    }

    async submit(ev) {
        let { token } = await this.props.stripe.createToken({ type: "card", currency: "usd" });
        let response = await axios("/charge", {
            method: "POST",
            headers: { "content-Type": "application/json" },
            data: {
                token: token.id,
                name: this.state.name,
                // email: this.state.email,
                description: "Payment at Dope Glass",
                amount: this.props.amount*100,
                cart: this.props.cart,
                userID: this.props.user.id
            }
        })
        if (response.data.message === "success") {
            this.state.paymentStatus = true;
            let receiptUrl = response.data.data.receipt_url;
            this.props.clearCart();
            // FLAG : REDIRECT TO PURCHASE COMPLETED NOTIFICATION PAGE
            this.props.history.replace("/order-status");
            // window.location.assign(receiptUrl);
        }
    }

    render() {
        return (
            <div ref={cardPayment => { this.cardPayment = cardPayment }} style={{ padding: "50px", border: "0px", background: "#ccc", margin: "50px" }}>
                <div style={{ margin: "10px", width: "300px" }}>
                    <label>Enter card number</label>
                    <CardNumberElement />
                </div>
                <div style={{ margin: "10px", width: "300px" }}>
                    <label>Enter expiry day</label>
                    <CardExpiryElement />
                </div>
                <div style={{ margin: "10px", width: "300px" }}>
                    <label>Enter CVV number</label>
                    <CardCvcElement />
                </div>
                <div style={{ margin: "10px", width: "300px" }}>
                    <label>Name on the card</label>
                    <input type="text" value={this.state.name} onChange={(e) => { this.setState({ name: e.target.value }) }} />
                </div>
                <div style={{ margin: "10px", width: "300px" }}>
                    <button type="button" onClick={this.submit}>Pay</button>
                </div>
            </div>
        )
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators({ clearCart }, dispatch)
}
export default withRouter(connect(null, mapDispatchToProps)(injectStripe(StripeComponent)));
