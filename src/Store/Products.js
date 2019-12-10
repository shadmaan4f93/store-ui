// import * as actionTypes from "./ActionTypes";
import { showSpinner } from './AppState';
import axios from '../Services/Axios';

export const SET_PRODUCTS = "SET_PRODUCTS";
export const SET_PRODUCT = "SET_PRODUCT";
export const RESET_SELECTED_PRODUCT = "RESET_SELECTED_PRODUCT";
export const INCREASE_PRODUCT_QUANTITY = "INCREASE_PRODUCT_QUANTITY";
export const DECREASE_PRODUCT_QUANTITY = "DECREASE_PRODUCT_QUANTITY";
export const SET_STATUS_SLTPRD_INCART = "SET_STATUS_SLTPRD_INCART";


export const setProducts = (products) => {
    return {
        type: SET_PRODUCTS,
        products
    }
}

const setSelectedProduct = (product) => {
    return {
        type: SET_PRODUCT,
        product
    }
}

export const increaseProductQty = () => {
    return { type: INCREASE_PRODUCT_QUANTITY }
}

export const decreaseProductQty = () => {
    return { type: DECREASE_PRODUCT_QUANTITY }
}

export const fetchProduct = (productId) => {
    return function (dispatch) {
        dispatch(showSpinner(true));

        return axios.get(`/product/${productId}`).then(response => {

            dispatch(setSelectedProduct(response.data.data[0]));
            dispatch(showSpinner(false));
        }, error => {
            dispatch(showSpinner(false));
            console.log(error);
            // FLAG -  handle the error here.
        })

    }
}

export const fetchProducts = (index) => {
    return function (dispatch) {
        dispatch(showSpinner(true));
        return axios.get(`https://moe-gifts-api.herokuapp.com/products/${index}`).then(response => {
            dispatch(setProducts(response.data.data));
            dispatch(showSpinner(false));
        }, error => {
            dispatch(showSpinner(false));
            console.log(error);
            // FLAG -  handle the error here.
        })
    }
}

export const resetSelectedProduct = () => {
    return {
        type: RESET_SELECTED_PRODUCT
    }
}

export const setStatusSelectedProductInCart = () => {

}

const ProductReducer = (state = { products: [], selectedProduct: "", isSelectProductInCart: "false" }, action) => {

    switch (action.type) {
        case SET_PRODUCTS:
            return { ...state, products: action.products };

        case SET_PRODUCT: {

            let product = { ...action.product };
            product["inCartCount"] = 1;
            return { ...state, selectedProduct: product };
        }
        case RESET_SELECTED_PRODUCT:
            return { ...state, selectedProduct: "" };

        case INCREASE_PRODUCT_QUANTITY: {
            let product = { ...state.selectedProduct };
            product["inCartCount"] = ++product["inCartCount"];
            return { ...state, selectedProduct: product }
        }
        case DECREASE_PRODUCT_QUANTITY: {
            let product = { ...state.selectedProduct };
            let qty = --product["inCartCount"];
            product["inCartCount"] = qty > 1 ? qty : 1;
            return { ...state, selectedProduct: product }
        }
        case SET_STATUS_SLTPRD_INCART: {
            return state;
        }
        default:
            return state;
    }
}

export default ProductReducer;
