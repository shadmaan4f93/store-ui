import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { CookiesProvider } from 'react-cookie';
import { StripeProvider } from 'react-stripe-elements';
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from 'redux-thunk';
import localStorage from 'local-storage';
// import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';

import { CART_ACTION } from "./Store/Cart";
import state from "./Store/AppState";
import products from "./Store/Products";
import cart from "./Store/Cart"
import './index.css';
import App from './App';
import './App.css';

let initState = {
    products: undefined,
    cart: undefined,
    state: undefined
}

const middlewares = [thunk];

// const devTools =
//     process.env.NODE_ENV === "production"
//         ? applyMiddleware(...middlewares)
//         : composeWithDevTools(applyMiddleware(...middlewares));

function saveToLocalStorage(state) {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.set("cart", serializedState);
    } catch (e) {
        console.log(e);
    }
}

function readFromLocalStorage() {
    try {
        const serializedState = localStorage.get('cart');
        if (serializedState == null)
            return undefined;
        return JSON.parse(serializedState);
    } catch (e) {
        console.log(e);
        return undefined;
    }
}

const cartStateFromLocalStorage = readFromLocalStorage();

if (cartStateFromLocalStorage) {
    initState = Object.assign(initState, cartStateFromLocalStorage);
}

const reducer = combineReducers({ products, state, cart });
// export const store = createStore(reducer, initState, devTools);
export const store = createStore(reducer, initState, applyMiddleware(...middlewares));

store.subscribe(() => {
    let appState = store.getState();
    if (appState.state.lastAction.actionType === CART_ACTION) {
        saveToLocalStorage({
            cart: appState.cart,
            cartSubTotal: appState.cartSubTotal,
            cartTax: appState.cartTax,
            cartTotal: appState.cartTotal
        });
    }
})

ReactDOM.render(
    <Router>
        <CookiesProvider>
            <Provider store={store}>
                <StripeProvider apiKey={process.env.REACT_APP_STRIPE_API_KEY}>
                    <App />
                </StripeProvider>
            </Provider>
        </CookiesProvider>
    </Router >,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
