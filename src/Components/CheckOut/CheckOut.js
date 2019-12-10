import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Elements } from 'react-stripe-elements';
import { withCookies } from 'react-cookie';

import StripeComponent from './StripeComponent';
import { saveUser } from '../../Store/AppState';
import { bindActionCreators } from 'redux';

class CheckOut extends Component {

    constructor(props) {
        super(props);
        this.state = {
            shipping: {
                addressLine1: "",
                addressLine2: "",
                location: "",
                state: "",
                zipcode: "",
                country: ""
            },
            billing: {
                addressLine1: "",
                addressLine2: "",
                location: "",
                state: "",
                zipcode: "",
                country: ""
            },
            shippingCurrent: {
                addressLine1: "",
                addressLine2: "",
                location: "",
                state: "",
                zipcode: "",
                country: ""
            },
            copyShippingToBilling: false,
            makeShippingAddEditable: false,
        }
        let user = props.user;
        if (user) {
            this.state.shippingCurrent = user.shippingAddress;
        }
    }

    handleInput = (field, subField, value) => {
        // Condition to allow making changes in the both the fields simulateously if checkbox is checked
        if (this.state.copyShippingToBilling) {
            this.setState(prevState => {
                return {
                    "shipping": { ...prevState["shipping"], [subField]: value },
                    "billing": { ...prevState["billing"], [subField]: value }
                }
            })
        }
        else
            this.setState(prevState => { return { [field]: { ...prevState[field], [subField]: value } } })
    }

    handleCheckboxInput = () => {
        if (this.state.copyShippingToBilling) {
            this.setState({
                copyShippingToBilling: false,
                billing: {
                    addressLine1: "",
                    addressLine2: "",
                    location: "",
                    state: "",
                    zipcode: "",
                    country: ""
                }
            })
        } else {
            this.setState(prevState => {
                return {
                    copyShippingToBilling: true,
                    billing: { ...prevState.shipping }
                }
            });
        }
    }

    saveShippingAddress = () => {
        this.props.saveUser({ ...this.props.user, shippingAddress: this.state.shippingCurrent });
        this.setState({ makeShippingAddEditable: false })
    }

    handleAddressForm = () => {
        this.props.saveUser({ ...this.props.user, shippingAddress: this.state.shipping, billingAddress: this.state.billing });
    }

    getAddressComponent = (field, editingDisabled) => {
        const subFieldArr = [
            { "label": "Address Line 1", "subFieldName": 'addressLine1', 'type': 'text' },
            { "label": "Address Line 2", "subFieldName": 'addressLine2', 'type': 'text' },
            { "label": "Location", "subFieldName": 'location', 'type': 'text' },
            { "label": "State", "subFieldName": 'state', 'type': 'text' },
            { "label": "Zip Code", "subFieldName": 'zipcode', 'type': 'text' },
            { "label": "Country", "subFieldName": 'country', 'type': 'text' },
        ]

        return (
            <div>{
                subFieldArr.map(item => {
                    return (
                        <div key={field + item.subFieldName}>
                            <label>{item.label}</label>
                            <input
                                id={field + item.subFieldName}
                                type={item.type}
                                value={this.state[field][item.subFieldName]}
                                onChange={(e) => this.handleInput(field, item.subFieldName, e.target.value)}
                                disabled={editingDisabled} />
                        </div>
                    )
                })
            }
            </div>
        )
    }

    render() {
        const { user, cart, cartTotal } = this.props;
        return (
            <div>
                {this.props.user.shippingAddress ? <div>
                    <div>We will ship your purchases at this address</div>
                    <button onClick={() => this.setState({ makeShippingAddEditable: true })}>Edit Address</button>
                    {this.getAddressComponent('shippingCurrent', !this.state.makeShippingAddEditable)}
                    {this.state.makeShippingAddEditable && <button type="button" onClick={this.saveShippingAddress}>Save Address</button>}
                </div> : <div>
                        <div> We don't have your address, please fill it in below</div>
                        <div>
                            <div>Shipping Address</div>
                            {this.getAddressComponent('shipping', false)}
                        </div>
                        <div>
                            <div>Billing Address</div>
                            <label>Same as Shipping Address</label>
                            <input type="checkbox" checked={this.state.copyShippingToBilling} onChange={this.handleCheckboxInput} />
                            {this.getAddressComponent('billing', false)}
                        </div>
                        <button onClick={this.handleAddressForm}>Save my address</button>
                    </div>
                }
                <Elements>
                    <StripeComponent user={user} amount={cartTotal} cart={cart} />
                </Elements>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.state.user,
        cartTotal: state.cart.cartTotal,
        cart: state.cart.cart
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ saveUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withCookies(CheckOut));