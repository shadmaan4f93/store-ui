import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { connect } from 'react-redux';
import { withCookies, Cookies } from 'react-cookie';
import { withRouter } from 'react-router-dom';
// import localStorage from 'local-storage';

import Searchbar from './Searchbar';
import { showModal, MODALS } from '../../Store/AppState';
import { clearCart } from '../../Store/Cart';
import { bindActionCreators } from 'redux';
import DopeGlassLogo from '../../images/logo-black-new.png';


class Header extends Component {

    showLoginButton = () => {
        let token = this.props.cookies.get('token');
        return token ? false : true;
    }

    logOut = () => {
        debugger;
        this.props.cookies.remove('token');
        this.props.cookies.remove('cart');
        this.props.clearCart();
        localStorage.removeItem("cart");
        let abc = localStorage.getItem('cart');
        console.log(abc)
        this.props.history.push('/');
    }
    render() {
        return (
            <React.Fragment>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand><Link to="/"><img src={DopeGlassLogo} alt="dope glass logo" className="header-logo"></img></Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link href="#home">About</Nav.Link>
                            <Nav.Link href="#link">Shop</Nav.Link>
                            <Nav.Link href="#link">Brands</Nav.Link>
                            <Nav.Link href="#link">Contact</Nav.Link>
                            {
                                this.showLoginButton() ? <>
                                    <Nav.Link><div onClick={() => this.props.showModal(MODALS.LOGIN)}>Login</div></Nav.Link>
                                    <Nav.Link><div onClick={() => this.props.showModal(MODALS.REGISTER)}>Register</div></Nav.Link>
                                </> : <>
                                        <Nav.Link><div onClick={() => { }}>Account</div></Nav.Link>
                                        <Nav.Link><div onClick={this.logOut}>Log Out</div></Nav.Link>
                                    </>
                            }

                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Searchbar />
            </React.Fragment>
        )
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        { showModal, clearCart }, dispatch
    )
}
export default withRouter(connect(null, mapDispatchToProps)(withCookies(Header)));

