import React, { Component } from 'react';
import './Footer.css';

export default class Footer extends Component {
    render() {
        return (
            <div className="container-fluid footer-sec">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6 col-md-3 footer-about">
                            <a href="#"><img src="images/logo-white-new.png" alt="" /></a>
                            <p>Lorem ipsum dolor sit  consectetur adipiscing elit. Vestibulum porttitor egestas orci, vitae ullamc. Lorem ipsum dolor sit adipiscing elit. Lorem ipsum dolor sit  consectetur adipiscing elit. </p>
                        </div>
                        <div className="col-md-3 col-sm-6 contact-info use foot-a">
                            <h3>Usefull Links</h3>
                            <ul>
                                <li><a href="#"><i className="fa fa-angle-right" aria-hidden="true"></i>About</a></li>
                                <li><a href="#"><i className="fa fa-angle-right" aria-hidden="true"></i>Shop</a></li>
                                <li><a href="#"><i className="fa fa-angle-right" aria-hidden="true"></i>Brands</a></li>
                                <li><a href="#"><i className="fa fa-angle-right" aria-hidden="true"></i>Events</a></li>
                                <li><a href="#"><i className="fa fa-angle-right" aria-hidden="true"></i>Contact</a></li>
                                <li><a href="#"><i className="fa fa-angle-right" aria-hidden="true"></i>Sitemap</a></li>
                            </ul>
                        </div>
                        <div className="col-md-3 col-sm-6 contact-info use foot-a">
                            <h3>Customer Care</h3>
                            <ul>
                                <li><a href="#"><i className="fa fa-angle-right" aria-hidden="true"></i>My Account</a></li>
                                <li><a href="#"><i className="fa fa-angle-right" aria-hidden="true"></i>Track your Order</a></li>
                                <li><a href="#"><i className="fa fa-angle-right" aria-hidden="true"></i>Wishlist</a></li>
                                <li><a href="#"><i className="fa fa-angle-right" aria-hidden="true"></i>Customer Service</a></li>
                                <li><a href="#"><i className="fa fa-angle-right" aria-hidden="true"></i>Returns/Exchange</a></li>
                                <li><a href="#"><i className="fa fa-angle-right" aria-hidden="true"></i>FAQs</a></li>
                                <li><a href="#"><i className="fa fa-angle-right" aria-hidden="true"></i>Product Support</a></li>
                            </ul>
                        </div>
                        <div className="col-md-3 col-sm-6 contact-info contact-span">
                            <h3>Contact Information</h3>
                            <div className="contact">
                                <i className="flaticon-placeholder-1"></i>
                                <p>xxx,xxxxxxx, xxxxxxxxxxxxx ,xxxxxxxxxx</p>
                            </div>
                            <div className="clearfix"></div>
                            <div className="contact">
                                <i className="flaticon-headphones"></i>
                                <p className="phone-no">+xx (xxx) xxx xxxx</p>
                            </div>
                            <div className="clearfix"></div>
                            <div className="contact">
                                <i className="flaticon-message"></i>
                                <p>xxx@xxx.com</p>
                            </div>
                            <div className="clearfix"></div>
                            <div className="follow-us">
                                <h2>Follow us</h2>
                                <div className="follow">
                                    <a href="#"><i className="fa fa-facebook-f" aria-hidden="true"></i></a>
                                    <a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a>
                                    <a href="#"><i className="fa fa-instagram" aria-hidden="true"></i></a>
                                    <a href="#"><i className="fa fa-youtube" aria-hidden="true"></i></a>
                                    <a href="#"><i className="fa fa-google-plus" aria-hidden="true"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!--newsletter--> */}
                <div className="container news-letter">
                    <div className="letter-news">
                        <div className="row">
                            <div className="col-md-4 col-sm-6 letter">
                                <i className="flaticon-newsletter"></i>
                                <p>Sign up to</p>
                                <h2>Newsletter</h2>
                            </div>
                            <div className="col-md-3 col-sm-6 sign-news">
                                <p>
                                    Sign up our newsletter and receive
                                    $20 coupon for first shopping
                                </p>
                            </div>
                            <div className="col-md-5 col-sm-12 email-address">
                                <input type="email" name="email" placeholder="Enter your email address" />
                                <div className="round">
                                    <a href="#"><i className="flaticon-paper-plane"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!--Copyright--> */}
                <div className="container copy-right">
                    <div className="right-copy">
                        <a href="#top" id="toper"><i className="fa fa-angle-double-up" aria-hidden="true"></i></a>
                        <div className="col-md-6 col-sm-6 copy-text">
                            <p>© 2019 <a href="#">DOPEGLASS </a>. All rights reserved DOPEGLASS Brand.</p>
                        </div>
                        <div className="col-md-6 col-sm-6 copy-image text-right">
                            <a href="#"><img src="images/pay-1.png" alt="" className="img-responsive" /></a>
                            <a href="#"><img src="images/pay-2.png" alt="" className="img-responsive" /></a>
                            <a href="#"><img src="images/pay-3.png" alt="" className="img-responsive" /></a>
                            <a href="#"><img src="images/pay-4.png" alt="" className="img-responsive" /></a>
                            <a href="#"><img src="images/pay-5.png" alt="" className="img-responsive" /></a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
