import axios from '../Services/Axios';
import { DECREMENT_ITEM, ADD_TO_CART } from './Cart';
var cookie = require('cookie');

export const SHOW_MODAL = "SHOW_MODAL";
export const SET_USER = "SET_USER";
export const SHOW_SPINNER = "SHOW_SPINNER";
export const USER_NOTIFICATION_ITEM_REMOVED = "USER_NOTIFICATION_ITEM_REMOVED";

// FLAG - cases not handled for login_alert and logout_alert 
export const MODALS = {
    LOGIN: "LOGIN",
    REGISTER: "REGISTER",
    CART: "CART",
    NONE: "NONE",
    FORGOT_PASSWORD: "FORGOT_PASSWORD",
    MESSAGE: {
        ITEM_REMOVED_ALERT: "ITEM_REMOVED_ALERT",
        ITEM_ADDED_ALERT: "ITEM_ADDED_ALERT",
        LOGIN_ALERT: "LOGIN_ALERT",
        LOGOUT_ALERT: "LOGOUT_ALERT"
    }
}

/**
 * Need to have product when the modal has item added/removed alert
 * @param {string} modal 
 * @param {object} product 
 */
export const showModal = (modal, product = null) => {
    return {
        type: SHOW_MODAL,
        modal,
        product
    }

}

export const userNotifyItemRemoved = (product) => {
    return {
        type: MODALS.MESSAGE.USER_NOTIFICATION_ITEM_REMOVED,
        product
    }
}

export const setUser = user => {
    return {
        type: SET_USER,
        user
    }
}

export const showSpinner = (value) => {
    return {
        type: SHOW_SPINNER,
        value
    }
}

export const saveUser = user => {
    return function (dispatch) {
        dispatch(showSpinner(true));

        return axios.put(`/user/${user.id}`, user).then(
            response => {
                console.log(response.data.data);
                // FLAG - set user that has been returned by the response body.
                let cookies = cookie.parse(document.cookie);
                console.log(cookies);
                cookies.user = response.data.data;
                // document.cookie.set('user', response.data.data);
                // let abc = document.cookie.length('user');
                dispatch(setUser(response.data.data));
                dispatch(showSpinner(false));
            },
            error => {
                console.log(error);
                dispatch(showSpinner(false));
                // FLAG handle error here.
            }
        )
    }
}

const AppStateReducer = (state = {
    user: "",
    modal: MODALS.NONE,
    showSpinner: false,
    lastAction: "",
    modalProduct: ""
}, action) => {
    state.lastAction = action;

    switch (action.type) {
        case SET_USER: {
            return { ...state, user: action.user }
        }
        case SHOW_MODAL: {
            // FLAG - remove if block in the production code.
            if ((action.modal === MODALS.MESSAGE.ITEM_REMOVED_ALERT || action.modal === MODALS.MESSAGE.ITEM_ADDED_ALERT)) {
                if (action.product === null)
                    alert("Need to have a product with this modal");
            }
            return { ...state, modal: action.modal, modalProduct: action.product };
        }
        case SHOW_SPINNER:
            return { ...state, showSpinner: action.value }
        case USER_NOTIFICATION_ITEM_REMOVED:
            return { ...state, modal: MODALS.MESSAGE.ITEM_REMOVED_ALERT, modalProduct: action.product }
        case DECREMENT_ITEM: {
            if (action.product.inCartCount === 1) {
                
                return { ...state, modal: MODALS.MESSAGE.ITEM_REMOVED_ALERT, modalProduct: action.product }
            }
            return state;
        }
        case ADD_TO_CART: {
            return { ...state, modal: MODALS.MESSAGE.ITEM_ADDED_ALERT, modalProduct: action.product }
        }
        default:
            return state;
    }
}

export default AppStateReducer;
