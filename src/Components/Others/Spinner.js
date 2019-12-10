import React, { Component } from 'react';
import spinnerGif from '../../images/spinner.gif';

export default class Spinner extends Component {
    render() {
        return (
            <div className="spinner">
                {/* <img src={spinnerGif} alt="loading" /> */}
                <svg
                    width="200px"
                    height="200px"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="xMidYMid"
                    className="lds-ripple"
                    style={{ background: "none" }}>
                    <circle
                        cx="50"
                        cy="50"
                        r="38.7164"
                        fill="none"
                        ng-attr-stroke="{{config.c1}}"
                        ng-attr-stroke-width="{{config.width}}"
                        stroke="#c5523f"
                        stroke-width="2">
                        <animate
                            attributeName="r"
                            calcMode="spline"
                            values="0;40"
                            keyTimes="0;1"
                            dur="1"
                            keySplines="0 0.2 0.8 1"
                            begin="-0.5s"
                            repeatCount="indefinite"></animate>
                        <animate
                            attributeName="opacity"
                            calcMode="spline"
                            values="1;0"
                            keyTimes="0;1"
                            dur="1"
                            keySplines="0.2 0 0.8 1"
                            begin="-0.5s"
                            repeatCount="indefinite"></animate>
                    </circle>
                    <circle
                        cx="50"
                        cy="50"
                        r="22.1782"
                        fill="none"
                        ng-attr-stroke="{{config.c2}}"
                        ng-attr-stroke-width="{{config.width}}"
                        stroke="#f2b736"
                        stroke-width="2">
                        <animate
                            attributeName="r"
                            calcMode="spline"
                            values="0;40"
                            keyTimes="0;1"
                            dur="1"
                            keySplines="0 0.2 0.8 1"
                            begin="0s"
                            repeatCount="indefinite"></animate>
                        <animate
                            attributeName="opacity"
                            calcMode="spline"
                            values="1;0"
                            keyTimes="0;1"
                            dur="1"
                            keySplines="0.2 0 0.8 1"
                            begin="0s"
                            repeatCount="indefinite"></animate>
                    </circle>
                </svg>
            </div>
        )
    }
}
