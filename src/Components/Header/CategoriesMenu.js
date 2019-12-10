import React, { Component } from 'react'
import hookah from '../../images/hookah-icon.png'
import CategoriesListDetails from './CategoriesListDetails'

export default class CategoriesMenu extends Component {
    render() {
        return (
            <React.Fragment>
                <li className="category-item">
                    <div className="category-item-img"><img src={hookah} alt="..." />Hookah<i className="fa fa-angle-right" aria-hidden="true"></i></div>
                    <div className="categories-mega-menu"><CategoriesListDetails /></div>
                </li>
                <li className="category-item">
                    <div className="category-item-img"><img src={hookah} alt="..." />Hookah<i className="fa fa-angle-right" aria-hidden="true"></i></div>
                    <div className="categories-mega-menu"><CategoriesListDetails /></div>
                </li>
                <li className="category-item">
                    <div className="category-item-img"><img src={hookah} alt="..." />Hookah<i className="fa fa-angle-right" aria-hidden="true"></i></div>
                    <div className="categories-mega-menu"><CategoriesListDetails /></div>
                </li>
                <li className="category-item">
                    <div className="category-item-img"><img src={hookah} alt="..." />Hookah<i className="fa fa-angle-right" aria-hidden="true"></i></div>
                    <div className="categories-mega-menu"><CategoriesListDetails /></div>
                </li>
                <li className="category-item">
                    <div className="category-item-img"><img src={hookah} alt="..." />Hookah<i className="fa fa-angle-right" aria-hidden="true"></i></div>
                    <div className="categories-mega-menu"><CategoriesListDetails /></div>
                </li>
            </React.Fragment>
        )
    }
}
