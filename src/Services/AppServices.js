import { store } from "../index";
/**
 * Fetches product by its id.
 * @param {string} id 
 * @returns {object} Product
 */
const getProductById = (id) => {
    let products = store.getState().products.products;
    return products.find(x => x.id === id);
}

/**
 * Calculates price after discount. 
 * @param {number} price - Price
 * @param {number} discountAmount - Discount Amount //pass 0 if discount is provided in discountPercentage 
 * @param {number} discountPercentage - Discount Percentage // Eg, pass 18 for 18%
 * @returns {string}
 */
const calculateDiscountedPrice = (price, discountAmount, discountPercentage) => {
    let discountedPrice = discountAmount > 0 ? (price - discountAmount) : (price * (100 - discountPercentage) / 100);
    return Math.round(discountedPrice * 100) / 100;
}


/**
 * Checks whether a user is logged in or not.
 * @returns {boolean}
 */
const isUserLoggedIn = () => {
    let state = store.getState();
    
    return state.state.user ? true : false;
}

export { getProductById, calculateDiscountedPrice, isUserLoggedIn }