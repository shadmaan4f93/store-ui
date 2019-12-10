import React, { Component } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

import './HomePageComponents.css'

export default class SideMenu extends Component {

    state = {
        categories: ["Dope Waterpipe", "Luxis Waterpipe", "TOXIC Waterpipe", "AK47 Glass Waterpipe"]
    }

    menuItemAccordion = () => {
        return (
            <div className="categories-list">
                <ul>
                    <li>Lorem ipsum dolor</li>
                    <li>Nsectetur adipiscing</li>
                    <li>Vestibulum porttitor </li>
                    <li>Vitae ullamcorper risus </li>
                    <li>Consectetur id orem</li>
                </ul>
            </div>
        )
    }

    menuItem = (item, index) => {
        return (
            <div key={index} className="categories-list">
                <ul>
                    <li className="sub-menu">
                        <a className="main-a">{item}<i className='fa fa-angle-right'></i></a>
                        <ul>
                            <li>Lorem ipsum dolor</li>
                            <li>Nsectetur adipiscing</li>
                            <li>Vestibulum porttitor </li>
                            <li>Vitae ullamcorper risus </li>
                            <li>Consectetur id orem</li>
                        </ul>
                    </li>
                </ul>
            </div>
        )
    }
    getAccordionItem = (item, index) => {
        return (
            <Card key={index}>
                <Accordion.Toggle as={Card.Header} eventKey={index}>{item} <i style={{ float: "right" }} className='fa fa-angle-right'></i></Accordion.Toggle>
                <Accordion.Collapse eventKey={index}>
                    <Card.Body>{this.menuItemAccordion()}</Card.Body>
                </Accordion.Collapse>
            </Card>);
    }

    render() {
        return (
            <>
                <div className="manufacture" >
                    <div className="main">Brands</div>
                    <Accordion defaultActiveKey={0}>
                        {
                            this.state.categories.map((item, index) => {
                                return this.getAccordionItem(item, index);
                            })
                        }
                    </Accordion>
                </div>


                <div className="manufacture" style={{ marginTop: "50px" }}>
                    <div className="main">Brands</div>
                    <div>
                        {this.state.categories.map((item, index) => this.menuItem(item, index))}
                        <div className="clearfix"></div>
                        <div className="banner-img col-sm-6 col-md-12"><img src="images/banner-1.jpg" alt="" className="img-responsive" /></div>
                        <div className="banner-img col-sm-6 col-md-12"><img src="images/banner-2.jpg" alt="" className="img-responsive" /></div>
                    </div>
                </div>
            </>
        )
    }
}
