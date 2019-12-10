import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import Sonnet from 'react-bootstrap/Sonnet';

// import ImageGallery from 'react-image-gallery';
// import "react-image-gallery/styles/css/image-gallery.css";

import './ProductDetails.css';
import image1 from '../images/detail/gla12s.png'
// import image2 from '../images/detail/img.png'
import imageSmall1 from '../images/detail/small-1.jpg'
// import imageSmall2 from '../images/detail/small-2.jpg'
import { calculateDiscountedPrice } from '../Services/AppServices'
import {
    incrementItem,
    decrementItem,
    addToCart,
    updateItemCount
} from '../Store/Cart';
import {
    fetchProduct,
    resetSelectedProduct,
    increaseProductQty,
    decreaseProductQty
} from '../Store/Products';

class ProductDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.id,
            isQtyUpdated: false,
            showQtyUpdated: false
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.props.fetchProduct(this.props.match.params.id);
    }

    componentWillUnmount = () => {
        this.props.resetSelectedProduct();
        this.props.resetSelectedProduct();
    }


    getTabPane = (item) => {
        return (
            <Tab.Pane eventKey={item}>
                <p>Tab Name: <b>{item}</b></p>
                <p>Product Info</p>

                <p><b>Standard Shipping:</b> Shipping within 6 business days, $4 - FREE (spend over $40) Orders under $40 may be shipped on an untracked service and may take longer to arrive</p>
                <p><b>4-Day Shipping:</b> $6.00</p>
                <p><b>2-Day Shipping:</b> $12.00 or FREE when you spend $140* </p>
                <p><b>1-Day Shipping:</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestib porttitor egestas orci, vitae ullamcorper risus  dolor sit amet, consectetur adium porttitor egestas orci, vitae ullamcor consectetur id. Vestib porttitor egestas orci, vitae ullamcorper risus  dolor sit amet, </p>
                <p><b>Dorem ipsum dolor sit: </b> Amet, consectetur adipiscing elit. Vestib porttitor egestas orci, vitae ullamcorper risus  dolor sit amet, consectetur adium porttitor egestas orci, vitae ullamcor consectetur id. Vestib porttitor egestas orci, vitae ullamcorper risus  dolor sit amet, </p>
            </Tab.Pane>)
    }

    addProductToCart = (product, qty) => {
        this.props.addToCart(product, qty);
    }

    incrementItemCount = (id, isProductInCart) => {
        let debounce;
        isProductInCart ? this.props.incrementItem(id) : this.props.increaseProductQty()
        clearTimeout(debounce)
        debounce = setTimeout(() => {
            this.setState({ showQtyUpdated: true });
            setTimeout(() => this.setState({ showQtyUpdated: false }), 3000)
        },
            500);
    }

    decrementItemCount = (isProductInCart, productInCart) => {
        this.setState({ showQtyUpdated: true });
        isProductInCart ? this.props.decrementItem(productInCart) : this.props.decreaseProductQty();
    }

    // changeItemCount = (product, value) => {
    //     this.props.updateItemCount(product, value);
    // }


    render() {
        // const { product } = this.state;
        
        const { selectedProduct: product, cart } = this.props;
        const { id, isQtyUpdated } = this.state;
        let productInCart = cart.find(item => item.id === id);
        let isProductInCart = product ? productInCart ? true : false : false;

        return (
            <div>
                <div className="detail-page grid-page">
                    <div className="container-fluid header-main">
                        <div className="container text-center">
                            <h2>Poduct Detail</h2>
                            <div className="link-sec">
                                <a>Home</a> <i className="fa fa-angle-right"></i> <a href="#">Poduct Detail</a>
                            </div>
                        </div>
                    </div>

                    {/* <!--main--> */}
                    <div className="container product-information padd-80">
                        <div className="row">
                            <div className="col-md-5 col-lg-6 detail-left text-center">
                                {product.new && <div className="new-label">New</div>}
                                <a href="#" data-toggle="modal" data-target="#myModal-" className="zoom-btn"><i className="fa fa-search-plus"></i></a>
                                {/* <ImageGallery items={this.images} /> */}

                                {/* INSERT IMAGE SLIDER HERE}
                            <div className="clearfix"></div>

                            {/* <!--Modal--> */}
                                <div className="modal fade bs-example-modal-lg" id="myModal-" tabIndex="-1" role="dialog">
                                    <div className="modal-dialog modal-lg" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                                <h4 className="modal-title"></h4>
                                            </div>
                                            <div className="modal-body">

                                                <div id="carousel-example-generic" className="carousel slide" data-ride="carousel">

                                                    {/* <!-- Wrapper for slides --> */}
                                                    <div className="carousel-inner" role="listbox">
                                                        <div className="item active text-center">
                                                            <img src="images/detail/gla12s.png" alt="..." />
                                                        </div>
                                                        <div className="item text-center">
                                                            <img src="images/detail/img.png" alt="..." />
                                                        </div>
                                                        <div className="item text-center">
                                                            <img src="images/detail/gla12s.png" alt="..." />
                                                        </div>
                                                    </div>

                                                    {/* <!-- Controls --> */}
                                                    <a className="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
                                                        <span className="fa fa-angle-left" aria-hidden="true"></span>
                                                        <span className="sr-only">Previous</span>
                                                    </a>
                                                    <a className="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
                                                        <span className="fa fa-angle-right" aria-hidden="true"></span>
                                                        <span className="sr-only">Next</span>
                                                    </a>

                                                    {/* <!-- Indicators --> */}
                                                    <ol className="carousel-indicators">
                                                        <li data-target="#carousel-example-generic" data-slide-to="0" className="active"><img src="images/detail/small-1.jpg" alt="" /></li>
                                                        <li data-target="#carousel-example-generic" data-slide-to="1"><img src="images/detail/small-2.jpg" alt="" /></li>
                                                        <li data-target="#carousel-example-generic" data-slide-to="2"><img src="images/detail/small-1.jpg" alt="" /></li>
                                                    </ol>

                                                </div>

                                            </div>
                                            {/* <!--<div className="modal-footer">
                                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                            <button type="button" className="btn btn-primary">Save changes</button>
                                         </div>--> */}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-7 col-lg-6 detail-right">
                                <div className="detail-top">
                                    <h1>{product.name}</h1>
                                    <h6>{product.title}</h6>
                                    <div className="rating">
                                        <i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i>
                                        <span>( 12 reviews )</span>
                                        <a href="#">Write a review</a>
                                        <div className="clearfix"></div>
                                    </div>
                                    <div className="rate">
                                        {
                                            product.sale ? (<h2>$ {calculateDiscountedPrice(product.priceUs, product.discountAmount, product.discountPercentage)}<del>$ {product.priceUs}</del></h2>) :
                                                (<p>$ {product.priceUs}</p>)
                                        }
                                        {product.sale ?
                                            (product.discountAmount > 0 ? <label className="offer-label">{`- $${product.discountAmount}`}</label> :
                                                <label className="offer-label">{`- ${product.discountPercentage}%`}</label>) : null}
                                        <span><i className="fa fa-check-circle"></i>{product.count > 0 ? "In stock" : "Out of Stock"} </span>
                                        <div className="clearfix"></div>
                                    </div>
                                </div>
                                <ul className="detail">
                                    <li className="sub-menu">
                                        <a className="main-a" href="javascript:void(0)">Description <i className="fa fa-angle-down"></i></a>
                                        <ul>
                                            <div dangerouslySetInnerHTML={{ __html: product.description }} />
                                        </ul>
                                    </li>
                                </ul>
                                <div className="detail-btm">
                                    <div className="detail-row">
                                    </div>
                                    <div className="detail-row quantity-box">
                                        <p className="text-uppercase">Quantity</p><div className="clearfix"></div>
                                        <div id="field1" className="input--filled">
                                            <button
                                                type="button"
                                                id="sub"
                                                className="sub"
                                                onClick={() => this.decrementItemCount(isProductInCart, productInCart)} >
                                                <i className="fa fa-minus" aria-hidden="true"></i>
                                            </button>
                                            <input
                                                type="number"
                                                id="item-count-input"
                                                value={isProductInCart ? productInCart.inCartCount : product.inCartCount}
                                                disabled
                                                // onChange={(e) => this.changeItemCount(productInCart, e.target.value)}
                                                className="field" />
                                            <button
                                                type="button"
                                                id="add"
                                                className="add"
                                                onClick={() => this.incrementItemCount(id, isProductInCart)}>
                                                <i className="fa fa-plus" aria-hidden="true"></i>
                                            </button>
                                            <div className="clearfix"></div>
                                        </div>
                                        <button
                                            type="button"
                                            className="coupon"
                                            disabled={isProductInCart ? (isQtyUpdated ? false : true) : false}
                                            onClick={() => this.addProductToCart(product, product.inCartCount)}>
                                            {isProductInCart ? "In cart" : "Add to cart"}
                                        </button>
                                        <div className="action-icon pull-right">
                                            <a href="#"><i className="fa fa-heart-o" aria-hidden="true"></i>Wish list</a>
                                        </div>
                                        <div className="clearfix"></div>
                                    </div>
                                    <div className="detail-row"><p><span>SKU:</span> {product.sku}</p></div>
                                    <div className="detail-row"><p><span>Category:</span> {product.title}</p></div>
                                </div>
                            </div>
                            <div className="clearfix"></div>
                        </div>

                        <div className="product-tab">
                            <Tab.Container defaultActiveKey="product">
                                <Row>
                                    <Col sm={3} className="tab-left-side">
                                        <Nav variant="pills" className="flex-column">
                                            <Nav.Item>
                                                <Nav.Link eventKey="product">Product Info</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="delivery">Delivery</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="returns">Returns</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="addInfo">Additional Information</Nav.Link>
                                            </Nav.Item>
                                        </Nav>
                                    </Col>
                                    <Col sm={9}>
                                        <Tab.Content>
                                            {this.getTabPane("product")}
                                            {this.getTabPane("delivery")}
                                            {this.getTabPane("returns")}
                                            {this.getTabPane("addInfo")}
                                        </Tab.Content>
                                    </Col>
                                </Row>
                            </Tab.Container>
                        </div>

                        <div className="slider-head">
                            <h3>Related Products</h3>
                        </div>

                        <div className="tranding mt-30">
                            <div className="owl-carousel special-offer" id="best">

                                <div className="thumbnail no-border no-padding">
                                    <div className="product">

                                        <div className="product-img">
                                            <a href="#" className="product-href"></a>
                                            <img src="images/grid/gla12s.png" alt="" className="img-responsive img-overlay" />
                                            <img src="images/grid/img.png" alt="" className="img-responsive" />
                                            <div className="offer-discount">-25%</div>
                                            <div className="sale-heart-hover"><a href="#"><i className="flaticon-heart"></i></a></div>
                                        </div>
                                        <div className="product-body">
                                            <p><a href="#">Glass Hookah</a></p>
                                            <h4>595.50$</h4>
                                            <div className="product-hover">
                                                <div className="add-cart-hover"><a href="#"><h6>Add to cart</h6> <i className="fa fa-plus" aria-hidden="true"></i></a></div>
                                                <div className="quick-view"><a href="#"><i className="fa fa-search-plus" aria-hidden="true"></i></a></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="thumbnail no-border no-padding">
                                    <div className="product">

                                        <div className="product-img">
                                            <a href="#" className="product-href"></a>
                                            <img src="images/grid/img.png" alt="" className="img-responsive img-overlay" />
                                            <img src="images/grid/gla12s.png" alt="" className="img-responsive" />
                                            <div className="offer-discount">-25%</div>
                                            <div className="sale-heart-hover"><a href="#"><i className="flaticon-heart"></i></a></div>
                                        </div>
                                        <div className="product-body">
                                            <p><a href="#">Glass Hookah</a></p>
                                            <h4>595.50$</h4>
                                            <div className="product-hover">
                                                <div className="add-cart-hover"><a href="#"><h6>Add to cart</h6> <i className="fa fa-plus" aria-hidden="true"></i></a></div>
                                                <div className="quick-view"><a href="#"><i className="fa fa-search-plus" aria-hidden="true"></i></a></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="thumbnail no-border no-padding">
                                    <div className="product">

                                        <div className="product-img">
                                            <a href="#" className="product-href"></a>
                                            <img src="images/grid/gla12s.png" alt="" className="img-responsive img-overlay" />
                                            <img src="images/grid/img.png" alt="" className="img-responsive" />
                                            <div className="offer-discount">-25%</div>
                                            <div className="sale-heart-hover"><a href="#"><i className="flaticon-heart"></i></a></div>
                                        </div>
                                        <div className="product-body">
                                            <p><a href="#">Glass Hookah</a></p>
                                            <h4>595.50$</h4>
                                            <div className="product-hover">
                                                <div className="add-cart-hover"><a href="#"><h6>Add to cart</h6> <i className="fa fa-plus" aria-hidden="true"></i></a></div>
                                                <div className="quick-view"><a href="#"><i className="fa fa-search-plus" aria-hidden="true"></i></a></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="thumbnail no-border no-padding">
                                    <div className="product">

                                        <div className="product-img">
                                            <a href="#" className="product-href"></a>
                                            <img src="images/grid/img.png" alt="" className="img-responsive img-overlay" />
                                            <img src="images/grid/gla12s.png" alt="" className="img-responsive" />
                                            <div className="offer-discount">-25%</div>
                                            <div className="sale-heart-hover"><a href="#"><i className="flaticon-heart"></i></a></div>
                                        </div>
                                        <div className="product-body">
                                            <p><a href="#">Glass Hookah</a></p>
                                            <h4>595.50$</h4>
                                            <div className="product-hover">
                                                <div className="add-cart-hover"><a href="#"><h6>Add to cart</h6> <i className="fa fa-plus" aria-hidden="true"></i></a></div>
                                                <div className="quick-view"><a href="#"><i className="fa fa-search-plus" aria-hidden="true"></i></a></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="thumbnail no-border no-padding">
                                    <div className="product">

                                        <div className="product-img">
                                            <a href="#" className="product-href"></a>
                                            <img src="images/grid/gla12s.png" alt="" className="img-responsive img-overlay" />
                                            <img src="images/grid/img.png" alt="" className="img-responsive" />
                                            <div className="offer-discount">-25%</div>
                                            <div className="sale-heart-hover"><a href="#"><i className="flaticon-heart"></i></a></div>
                                        </div>
                                        <div className="product-body">
                                            <p><a href="#">Glass Hookah</a></p>
                                            <h4>595.50$</h4>
                                            <div className="product-hover">
                                                <div className="add-cart-hover"><a href="#"><h6>Add to cart</h6> <i className="fa fa-plus" aria-hidden="true"></i></a></div>
                                                <div className="quick-view"><a href="#"><i className="fa fa-search-plus" aria-hidden="true"></i></a></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!--modal--> */}
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        cart: state.cart.cart,
        selectedProduct: state.products.selectedProduct
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        incrementItem,
        decrementItem,
        addToCart,
        fetchProduct,
        resetSelectedProduct,
        increaseProductQty,
        decreaseProductQty,
        updateItemCount
    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
