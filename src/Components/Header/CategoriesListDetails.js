import React, { Component } from 'react'
import menuBanner from '../../images/menu-banner.jpg'

export default class CategoriesListDetails extends Component {
    render() {
        return (
            <div className="">
                <div className="categories-main-menu">
                    <span>
                        <span className="title">Hookah</span>
                        <span >Khalil Mamoon Hookah</span>
                        <span >Mya Hookah</span>
                        <span >Chinese Hookah</span>
                        <span >Glass Hookah</span>
                        <span >Mob Hookah</span>
                        <span >Modern Hookah</span>
                        <span >Egyptian Hookah</span>
                        <span >Party Hookah</span>
                        <span >Starbuzz Hookah</span>
                        <span >Stem Only</span>
                    </span>
                    <span>
                        <span className="title">Hookah</span>
                        <span >Khalil Mamoon Hookah</span>
                        <span >Mya Hookah</span>
                        <span >Chinese Hookah</span>
                        <span >Glass Hookah</span>
                        <span >Mob Hookah</span>
                        <span >Modern Hookah</span>
                        <span >Egyptian Hookah</span>
                        <span >Party Hookah</span>
                        <span >Starbuzz Hookah</span>
                        <span >Stem Only</span>
                    </span>

                </div>
                <div className="categories-img">
                    <div className="single-banner-2"><img src={menuBanner} alt="banner" /></div>
                </div>
                <div className="clearfix"></div>
                {/* </div>
                </li> */}
            </div>
        )
    }
}
