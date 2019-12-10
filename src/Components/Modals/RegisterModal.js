import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './Modal.css'
import loginLogo from '../../images/logo-white-new.png';
import menuBanner from '../../images/menu-banner.jpg'
import { showModal, MODALS } from '../../Store/AppState';


class RegisterModal extends Component {
    openLoginModal = () => {
        this.props.showModal(MODALS.LOGIN);
    }

    closeRegisterModal = () => {
        this.props.showModal(MODALS.NONE);
    }

    submitForm = (event) => {
        event.preventDefault();
    }
    render() {
        return (
            <div className="row">
                <div className="modal-content">
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-sm-5 login-left-img">
                                <img src={menuBanner} className="img-responsive" alt="" />
                                <div className="login-img-overlay">
                                    <h2>Sign In</h2>
                                    <p>Sign up our Website and receive up to $100 coupon for first shopping</p>
                                    <div className="modal-img-text"><img src={loginLogo} alt="" className="img-responsive" /></div>
                                </div>
                            </div>
                            <div className="col-sm-7 login-right-content">
                                <button onClick={this.closeRegisterModal} type="button" className='login-close-btn' data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <form onSubmit={this.submitForm}>
                                    <div className="form-sec">
                                        <div className="tab-content">
                                            {/* <div className="social-button">
                                        <div className="facebook"><a href="#"><i className="fa fa-facebook-f" aria-hidden="true"></i>Sign in with facebook</a></div>
                                        <div className="facebook google"><a href="#"><i className="fa fa-google-plus" aria-hidden="true"></i>Sign in with google</a></div>
                                        <div className="facebook twitter text-center"><a href="#"><i className="fa fa-twitter pull-left" aria-hidden="true"></i>Sign in with twitter</a></div>
                                    </div>
                                    <div className="or"><span>Or</span></div> */}
                                            <div className="input-row">
                                                <h5>username</h5><input className="input-1" type="text" name="username" placeholder="Enter username" />
                                                <span className="underline"></span>
                                            </div>
                                            <div className="input-row">
                                                <h5>email</h5><input className="input-1" type="email" name="email" placeholder="Enter your Email ID" />
                                                <span className="underline"></span>
                                            </div>
                                            <div className="input-row">
                                                <h5>password</h5><input className="input-1" type="text" name="password" placeholder="Enter your password" />
                                                <span className="underline"></span>
                                            </div>
                                            <div className="input-row">
                                                <h5>Re-enter your password</h5><input className="input-1" type="text" name="re-enter-password" placeholder="Re-Enter your Password" />
                                                <span className="underline"></span>
                                            </div>
                                            <div className="clearfix"></div>
                                            <div className="privacy-sec">
                                                <input id="4" type="checkbox" /><label htmlFor="4">Remember me</label>
                                            </div>
                                            <div className="clearfix"></div>
                                            <div className="button">
                                                <button>Get started</button>
                                            </div>
                                            <div className="modal-acc">
                                                <p>Already have an account? <span onClick={this.openLoginModal} >Log In</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="clearfix"></div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ showModal }, dispatch);
}

export default connect(null, mapDispatchToProps)(RegisterModal);
