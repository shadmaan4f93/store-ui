import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ModalTemplate from './ModalTemplate';
import Login from './LoginModal';
import Register from './RegisterModal';
import ForgotPassword from './ForgotPasswordModal';
import { showModal, MODALS } from '../../Store/AppState';

class ModalComponent extends Component {

    // getModalBody = () => {
    //     switch (this.props.modal) {
    //         case MODALS.LOGIN:
    //             return <Login />;
    //         case MODALS.REGISTER:
    //             return <Register />;
    //         case MODALS.CATEGORY:
    //             return <CategoriesListDetails />
    //         // FLAG case MODALS.CART:
    //         default:
    //             return null;
    //     }
    // }


    getItemMsgAlertComponent = () => {
        return (
            <div>
                <img
                    style={{ width: "100px" }}
                    src={this.props.modalProduct.imageUrl}
                    alt={`${this.props.modalProduct.name.substring(0, 9)}...`} />
                <span>{this.props.modalProduct.name}</span>
            </div>
        )
    }

    getConfigObj = () => {
        switch (this.props.modal) {
            case MODALS.LOGIN:
                return {
                    header: undefined,
                    body: <Login />,
                    footer: undefined,
                    dialogClassName: "login-modal"
                }
            case MODALS.REGISTER:
                return {
                    header: undefined,
                    body: <Register />,
                    footer: undefined,
                    dialogClassName: "login-modal"
                }
            case MODALS.FORGOT_PASSWORD:
                return {
                    header: undefined,
                    body: <ForgotPassword />,
                    footer: undefined,
                    dialogClassName: "login-modal"
                }
            case MODALS.MESSAGE.ITEM_REMOVED_ALERT: {

                // let closeFun = this.props.showModal;
                return {
                    header: {
                        title: "Item removed from cart"
                    },
                    body: this.getItemMsgAlertComponent(),
                    footer: {
                        btn1: {
                            label: "Close",
                            btn1Handler: () => this.props.showModal(MODALS.NONE)
                        }
                    },
                    dialogClassName: ""
                }
            }
            case MODALS.MESSAGE.ITEM_ADDED_ALERT: {
                // let closeFun = this.props.showModal;
                return {
                    header: {
                        title: "Item added  to cart"
                    },
                    body: this.getItemMsgAlertComponent(),
                    footer: {
                        btn1: {
                            label: "Close",
                            btn1Handler: () => this.props.showModal(MODALS.NONE)
                        }
                    },
                    dialogClassName: ""
                }
            }
            // case MODALS.REGISTER:
            //     return this.REGISTER_MODAL_CONFIG;
            // case MODALS.CATEGORY:
            //     return this.CATEGORY_LIST_DETAILS_CONFIG
            // FLAG case MODALS.CART:
            default:
                return null;

        }
    }

    // LOGIN_MODAL_CONFIG = {
    //     showHeader: false,
    //     showFooter: false,
    //     dialogClassName: "login-modal"
    // }

    // REGISTER_MODAL_CONFIG = {
    //     showHeader: false,
    //     showFooter: false,
    //     dialogClassName: "login-modal"
    // }

    // CATEGORY_LIST_DETAILS_CONFIG = {
    //     showHeader: false,
    //     showFooter: false,
    //     dialogClassName: ""
    // }

    render() {
        return (
            <>{this.props.modal !== MODALS.NONE &&
                <ModalTemplate
                    configObj={this.getConfigObj()}
                    show={true}
                    handleClose={() => this.props.showModal(MODALS.NONE)}>
                    {/* {this.getModalBody()} */}
                </ModalTemplate>
            }
            </>
        )
    }
}
const mapStateToProps = state => {
    return {
        modal: state.state.modal,
        modalProduct: state.state.modalProduct
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators({ showModal }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(ModalComponent);
