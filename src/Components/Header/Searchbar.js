import React, { Component } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';

// import CategoriesMenu from './CategoriesMenu';
import BarCart from '../Cart/BarCart';
import CategoriesListDetails from './CategoriesListDetails';

export default class Searchbar extends Component {
    state = {
        showCategoriesModal: false,
        value: "",
        categoryList: ["Hookah1", "Hookah2", "Hookah3", "Hookah4", "Hookah5"],
        showCategoryDetailPanel: false
    }

    handleCategoriesClose = () => {
        this.setState({ showCategoriesModal: false })
    }
    handleChange = (event) => {
        this.setState({ value: event.target.value });
    }
    render() {
        return (
            <>
                <div className="container-fluid search-bar">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3">
                                <div className="categories">
                                    <Dropdown>
                                        <Dropdown.Toggle variant="danger" id="dropdown-basic">All Categories</Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            {this.state.categoryList.map((item, index) => {
                                                return (<Dropdown.Item key={index}
                                                    onMouseEnter={() => this.setState({ showCategoryDetailPanel: true })}
                                                    onMouseLeave={() => this.setState({ showCategoryDetailPanel: false })}
                                                >{item}</Dropdown.Item>);
                                            })}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                                {/*

                                <div className="categories">
                                     <ul>
                                        <li>All Categories <i className='fa fa-angle-down'></i>
                                            <ul>
                                                <CategoriesMenu />
                                            </ul>
                                        </li>
                                    </ul> 
                            </div>*/}
                            </div>
                            <div className="col-md-4 search">
                                <input type="text" name="search" placeholder="Search by product name" />
                                <select>
                                    <option>All Categories</option>
                                </select>
                                <div className="round search-round"><i className="flaticon-search"></i></div>
                            </div>
                            <div className="col-md-2">
                                <div className="bor"><p><i className="fa fa-heart-o"></i>&nbsp; Wish list</p></div>

                            </div>
                            <div className="col-md-3">
                                <BarCart />
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.showCategoryDetailPanel && <CategoriesListDetails />}
            </>
        )
    }
}


