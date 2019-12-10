export const ADD_TO_CART = "ADD_TO_CART";
const INCREMENT_ITEM = "INCREMENT_ITEM";
export const DECREMENT_ITEM = "DECREMENT_ITEM";
export const REMOVE_ITEM = "REMOVE_ITEM";
const CLEAR_CART = "CLEAR_CART";
export const CART_ACTION = "CART_ACTION";
const UPDATE_ITEM_COUNT = "UPDATE_ITEM_COUNT";

export const addToCart = (product, quantity = null) => {
    return {
        type: ADD_TO_CART,
        actionType: CART_ACTION,
        product,
        quantity
    }
}

export const removeFromCart = (id) => {
    return {
        type: REMOVE_ITEM,
        actionType: CART_ACTION,
        id
    }
}

export const incrementItem = (id) => {
    return {
        type: INCREMENT_ITEM,
        actionType: CART_ACTION,
        id
    }
}

export const decrementItem = (product) => {
    return {
        type: DECREMENT_ITEM,
        actionType: CART_ACTION,
        product
    }
}

export const updateItemCount = (product, qty) => {
    return {
        type: UPDATE_ITEM_COUNT,
        actionType: CART_ACTION,
        product, qty
    }
}

export const clearCart = () => {
    return {
        type: CLEAR_CART
    }
}

const calculateCartTotals = (state, cart) => {
    let cartSubtotal = 0, cartDiscount = 0;
    cart.forEach(item => {
        cartSubtotal = cartSubtotal + item.itemTotal;
        if (item.sale) {
            if (item.discountAmount > 0) {
                cartDiscount = cartDiscount + (item.inCartCount * item.discountAmount);
            } else if (item.discountPercentage > 0) {
                cartDiscount = cartDiscount + ((item.inCartCount * item.priceUs * item.discountPercentage) / 100);
            }
        }
    })

    let priceAfterDiscount = Math.round(cartSubtotal - cartDiscount) * 100 / 100;
    let cartTax = Math.round(priceAfterDiscount * process.env.REACT_APP_CART_TAX * 100) / 100;
    let cartTotal = Math.round((cartTax + priceAfterDiscount) * 100) / 100;
    return { cartSubtotal, cartDiscount, cartTax, cartTotal }
}

const CartReducer = (state = {
    cart: [],
    cartSubtotal: 0,
    cartTax: 0,
    cartTotal: 0,
    cartDiscount: 0
}, action) => {

    switch (action.type) {

        case ADD_TO_CART: {
            let product = action.product;
            let isProductInCart = false;
            state.cart.forEach(item => {
                if (item.id === product.id) {
                    isProductInCart = true;
                    return;
                }
            })
            if (isProductInCart) {
                return state;
            } else {

                product["inCartCount"] = action.quantity ? action.quantity : 1;
                product["itemTotal"] = Math.round(product.priceUs * 100) / 100;
                let newCart = [...state.cart];
                newCart.push(product);
                let cartTotals = calculateCartTotals(state, newCart);
                return { ...state, cart: newCart, ...cartTotals }
            }
        }

        case REMOVE_ITEM: {
            let cart = [...state.cart],
                index = cart.findIndex(item => item.id === action.id);
            if (index === -1)
                return state;
            else {
                cart.splice(index, 1);
                let cartTotals = calculateCartTotals(state, cart);
                return { ...state, cart: cart, ...cartTotals }
            }
        }

        case INCREMENT_ITEM: {
            let cart = [...state.cart],
                index = cart.findIndex(item => item.id === action.id);
            let cartItem = cart[index];
            if (index === -1) {
                return state;
            } else {
                cartItem.inCartCount += 1;
                cartItem.itemTotal = Math.round(cartItem.priceUs * cartItem.inCartCount * 100) / 100;
                let cartTotals = calculateCartTotals(state, cart);
                return { ...state, cart: cart, ...cartTotals }
            }
        }
        case DECREMENT_ITEM: {
            let cart = [...state.cart],
                index = cart.findIndex(item => item.id === action.product.id);
            let cartItem = cart[index];
            if (index === -1) {
                return state;
            } else {
                cartItem.inCartCount -= 1;
                cartItem.itemTotal = Math.round(cartItem.priceUs * cartItem.inCartCount * 100) / 100;
                if (cart[index].inCartCount <= 0)
                    cart.splice(index, 1);
                let cartTotals = calculateCartTotals(state, cart);
                return { ...state, cart: cart, ...cartTotals }
            }
        }

        case UPDATE_ITEM_COUNT: {
            
            let cart = [...state.cart],
                index = cart.findIndex(item => item.id === action.product.id);
            let cartItem = cart[index];
            if (index === -1) {
                return state;
            } else {
                cartItem.inCartCount = action.qty;
                cartItem.itemTotal = Math.round(cartItem.priceUs * cartItem.inCartCount * 100) / 100;
                if (cart[index].inCartCount <= 0)
                    cart.splice(index, 1);
                let cartTotals = calculateCartTotals(state, cart);
                return { ...state, cart: cart, ...cartTotals }
            }
        }

        case CLEAR_CART:
            return {
                cart: [],
                cartSubtotal: 0,
                cartTax: 0,
                cartTotal: 0,
                cartDiscount: 0
            }
        default:
            return state;
    }
}

export default CartReducer;
