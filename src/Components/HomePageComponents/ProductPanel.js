import React from 'react';
import { withRouter } from 'react-router-dom';

import { calculateDiscountedPrice } from '../../Services/AppServices';

function ProductPanel(props) {

    const { addToCart, product, onProductClickHandler } = props;
    const { id, name, imageUrl, sale, discountAmount, discountPercentage, priceUs } = product;
    return (
        
        <div className="col-md-4">
        <div className="product text-left">
            <div className="product-img">
                <img src={imageUrl} alt="" onClick={() => onProductClickHandler(id)} className="img-responsive" />
                {sale === true && <div className="offer-discount">{`Save ${discountAmount}$`}</div>}
                {/* HEART TO SAVE/WISHLIST AN ITEM */}
                <div className="sale-heart-hover"><i className="flaticon-heart"></i></div>
            </div>
            <div className="product-body">
                <p>{name}</p>
                <h4>{`$${calculateDiscountedPrice(priceUs, discountAmount, discountPercentage)}`}</h4>
                {sale && <h5>{`$${priceUs}`}</h5>}
                <div className="product-hover">
                    <div className="add-cart-hover" onClick={() => { addToCart(product) }}><h6>Add to cart</h6> <i className="fa fa-plus" aria-hidden="true"></i></div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default withRouter(ProductPanel);
