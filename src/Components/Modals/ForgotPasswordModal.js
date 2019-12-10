import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import './Modal.css'

import axios from '../../Services/Axios';
import menuBanner from '../../images/menu-banner.jpg'
import { showModal, MODALS, setUser } from '../../Store/AppState';
import loginLogo from '../../images/logo-white-new.png';

class ForgotPasswordModal extends Component {

    state = {
        email: null,
        isFormValid: true
    }

    inputHandler = (value) => {
        this.setState({ email: value });
    }

    validateInput = () => {
        const { email } = this.state;

        let validRequired = email.trim() === "" ? false : true;
        let validEmail = email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) ? true : false;

        return (validRequired && validEmail);
    }

    submitForm = (event) => {

        event.preventDefault();
        if (this.validateInput()) {
            // FLAG - submit the form
            axios.post('/forgot', { "email": this.state.email, "type": "User" }).then(response => {
                debugger;
                console.log(response);
            })
        } else {
            this.setState({ isFormValid: false });
        }

    }

    closeLoginModal = () => {
        this.props.showModal(MODALS.NONE);
    }

    render() {
        return (
            <div className="row">

                <div className="col-sm-5 login-left-img">
                    <img src={menuBanner} alt="" className="img-responsive" />
                    <div className="login-img-overlay">
                        <h2>Dope Glass</h2>
                        <p>Sign up our Website and receive up to $100 coupon for first shopping</p>
                        <div className="modal-img-text"><img src={loginLogo} alt="" className="img-responsive" /></div>
                    </div>
                </div>
                <div className="col-sm-7 login-right-content">
                    <button
                        type="button"
                        aria-label="Close"
                        className='login-close-btn'
                        onClick={this.closeLoginModal}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <form onSubmit={this.submitForm}>
                        <div className="form-sec pt-4">
                            <div className="tab-content">
                                {/* {this.state.wrongCredentials && <div style={{ color: "red", fontSize: "1.2em" }}>Either Email/Password is wrong</div>} */}
                                <div className="input-row">
                                    <h5>email</h5>
                                    <input
                                        className="input-1"
                                        type="email"
                                        name="email"
                                        value={this.state.email}
                                        onChange={(e) => this.inputHandler(e.target.value)}
                                        placeholder="Enter your Email ID" />
                                    <span className="underline"></span>
                                </div>

                                <div className="clearfix"></div>
                                <div className="button">
                                    <button type="submit">Submit</button>
                                    <button type="button" onClick={() => this.props.showModal(MODALS.LOGIN)}>Cancel</button>
                                </div>
                                <div className="swiss-right"><p>© 2019 <span>Dope Glass</span>. All Rights Reserved.</p></div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="clearfix"></div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ showModal, setUser }, dispatch);
}

export default withRouter(connect(null, mapDispatchToProps)(ForgotPasswordModal))
