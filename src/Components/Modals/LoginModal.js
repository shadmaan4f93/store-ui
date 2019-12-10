import React, { Component } from 'react';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import './Modal.css'

import axios from '../../Services/Axios';
import menuBanner from '../../images/menu-banner.jpg'
import { showModal, MODALS, setUser } from '../../Store/AppState';
import loginLogo from '../../images/logo-white-new.png';

class LoginModal extends Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        this.cookies = this.props.cookies;
    }

    state = {
        email: {
            value: "",
            isValid: false,
            isTouched: false,
            validation: ["required", "email"]
        },
        password: {
            value: "",
            isValid: false,
            isTouched: false,
            validation: ["required"]
        },
        wrongCredentials: false,

        hasFormBeenTouched: false,
        formHasError: false
    }

    loginInputHandler = (field, value) => {
        let inputFieldObj = { ...this.state[field] };
        inputFieldObj.value = value;
        inputFieldObj.isValid = this.validateInput(inputFieldObj);
        inputFieldObj.isTouched = true;
        this.setState({ [field]: inputFieldObj, hasFormBeenTouched: true });
    }

    loginBlurHandler = (field, value) => {
        this.loginInputHandler(field, value);
    }

    validateInput = (inputObj) => {
        let isValid = true;
        if (inputObj.validation.includes("required")) {
            isValid = (inputObj.value.trim() === "" ? false : true) && isValid;
        }
        if (inputObj.validation.includes("email")) {
            let validEmail = inputObj.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) ? true : false;
            isValid = isValid && validEmail;
        }
        return isValid;
    }

    forgotPasswordHandler = () => {
        this.props.showModal(MODALS.FORGOT_PASSWORD);
        // this.props.history.push("/forgot-password")
    }

    submitForm = (event) => {
        event.preventDefault()
        const { setUser, showModal, history, location } = this.props;
        if (this.state.hasFormBeenTouched) {
            const fields = ["email", "password"];
            let isFormValid = true;
            fields.forEach(item => {
                isFormValid = this.state[item].isValid && isFormValid;
            })
            this.setState({ formHasError: !isFormValid });
            if (isFormValid) {
                let body = {
                    email: this.state.email.value,
                    password: this.state.password.value,
                    type: "User"
                }
                axios.post("/login", body).then(response => {
                    console.dir(response);
                    alert(JSON.stringify(response, null, 4));
                    if (response.data.statusCode === 401) {
                        this.setState({ wrongCredentials: true });
                    }
                    if (response.data.statusCode === 200) {
                        
                        this.cookies.set("token", response.data.token, { path: "/", sameSite: true });
                        this.cookies.set("user", response.data.data, { path: "/", sameSite: true });
                        setUser(response.data.data);
                        showModal(MODALS.NONE);
                        if (location.pathname === "/cart") {
                            history.push("/checkout")
                        }
                    }
                }).catch(err => console.log(err))
            }
        } else {
            this.setState({ formHasError: true })
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
                        <h2>Login</h2>
                        <p>Sign up our Website and receive up to $100 coupon for first shopping</p>
                        <div className="modal-img-text"><img src={loginLogo} alt="" className="img-responsive" /></div>
                    </div>
                </div>
                <div className="col-sm-7 login-right-content">
                    <button type="button" aria-label="Close" className='login-close-btn' onClick={this.closeLoginModal}><span aria-hidden="true">&times;</span></button>
                    <form onSubmit={this.submitForm}>
                        <div className="form-sec pt-4">
                            <div className="tab-content">
                                {/* <div className="social-button">
                                <div className="facebook"><a href="#"><i className="fa fa-facebook-f" aria-hidden="true"></i>Sign in with facebook</a></div>
                                <div className="facebook google"><a href="#"><i className="fa fa-google-plus" aria-hidden="true"></i>Sign in with google</a></div>
                                <div className="facebook twitter text-center"><a href="#"><i className="fa fa-twitter pull-left" aria-hidden="true"></i>Sign in with twitter</a></div>
                            </div>  
                            <div className="or"><span>Or</span></div> */}
                                {this.state.wrongCredentials && <div style={{ color: "red", fontSize: "1.2em" }}>Either Email/Password is wrong</div>}
                                <div className="input-row">
                                    <h5>email</h5><input className="input-1" type="email" name="email" value={this.state.email.value} onChange={(e) => this.loginInputHandler("email", e.target.value)} placeholder="Enter your Email ID" />
                                    <span className="underline"></span>
                                </div>
                                <div className="input-row">
                                    <h5>password</h5><input className="input-1" type="password" name="password" value={this.state.password.value} onChange={(e) => this.loginInputHandler("password", e.target.value)} placeholder="Enter your password" />
                                    <span className="underline"></span>
                                </div>
                                <div className="clearfix"></div>
                                {/* <div className="privacy-sec">
                                    <input id="5" type="checkbox" /><label htmlFor="5">Remember me</label>
                                </div> */}

                                <div className="modal-acc">
                                    <p>Forgot your password? <span onClick={this.forgotPasswordHandler}>Click here</span></p>
                                </div>
                                <div className="clearfix"></div>
                                <div className="button">
                                    <button type="submit">Login</button>
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

export default withRouter(connect(null, mapDispatchToProps)(withCookies(LoginModal)))
