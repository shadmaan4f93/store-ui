import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel';

import bannerBg1 from "../../images/bg-1.jpg";
import bannerBg2 from "../../images/bg-2.jpg";
import TestBannerComponent from "./TestBannerComponent";

export default class BannerCarousel extends Component {
    render() {
        return (
            <Carousel>
                <Carousel.Item>
                    {/* <img
                        className="d-block w-100"
                        src={bannerBg2}
                        alt="First slide"
                    /> */}
                    <TestBannerComponent img={bannerBg1} />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    {/* <img
                        className="d-block w-100"
                        src={bannerBg1}
                        alt="Third slide"
                    /> */}
                    <TestBannerComponent img={bannerBg2} />

                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    {/* <img
                        className="d-block w-100"
                        src={bannerBg1}
                        alt="Third slide"
                    /> */}
                    <TestBannerComponent img={bannerBg1} />

                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        )
    }
}
