import React, { Component } from "react";

import { Link } from "react-router-dom";
import { ProductBox } from "../product";
import "./slider.scss";

class ImageSlider extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            currentIndex: 0,
            sliderWidth: 100,
        };

        this.prev = this.prev.bind( this );
        this.next = this.next.bind( this );
        this.findElementWidth = this.findElementWidth.bind( this );
    }

    componentDidMount() {
        window.addEventListener( "resize", this.findElementWidth );
        this.findElementWidth();
    }

    componentWillUnmount() {
        window.removeEventListener( "resize", this.findElementWidth );
    }

    findElementWidth() {
        const { sliderWidth } = this.state;
        const sliderCurrentWidth = document.querySelector( ".slider-wrap" ).offsetWidth;
        if ( sliderWidth !== sliderCurrentWidth ) {
            this.setState( { sliderWidth: sliderCurrentWidth } );
        }
    }

    prev() {
        const prevIndex = this.state.currentIndex - 1;
        if ( prevIndex > -1 ) {
            this.setState( { currentIndex: prevIndex } );
        }
    }

    next() {
        const { numberOfImages, sliderSettings } = this.props;
        const { responsive } = sliderSettings;

        let settings = sliderSettings;
        if ( responsive ) {
            settings = selectResponsiveSettings( responsive );
        }

        const { slidesToShow } = settings;

        const nextIndex = this.state.currentIndex + 1;
        if ( nextIndex < numberOfImages - slidesToShow + 1 ) {
            this.setState( { currentIndex: nextIndex } );
        }
    }

    render() {
        const { currentIndex, sliderWidth } = this.state;
        const { elements, type, numberOfImages, sliderSettings } = this.props;
        const { responsive } = sliderSettings;

        let settings = sliderSettings;
        if ( responsive ) {
            settings = selectResponsiveSettings( responsive );
        }
        const { slidesToShow } = settings;

        const elementWidth = sliderWidth / slidesToShow;
        const trackWidth = elementWidth * numberOfImages;

        const displayElements = buildDisplayElements( elements, type, currentIndex, elementWidth );

        const atLeftEnd = currentIndex === 0;
        const atRightEnd = numberOfImages - slidesToShow === currentIndex;

        const trackStyles = {
            width: `${ trackWidth }px`,
            left: `-${ elementWidth * currentIndex }px`,
        };

        return (
            <div className="slider-wrap">
                {!atLeftEnd && (
                    <button className="btn-left nav-btn" onClick={ this.prev }>
                        <i className="fas fa-chevron-left" />
                    </button>
                )}

                <div className="slider">
                    <div className="slider-track" style={ trackStyles }>
                        {displayElements}
                    </div>
                </div>

                {!atRightEnd && (
                    <button className="btn-right nav-btn" onClick={ this.next }>
                        <i className="fas fa-chevron-right" />
                    </button>
                )}
            </div>
        );
    }
}

function buildDisplayElements( elements, type, currentIndex, elementWidth ) {
    if ( type === "PRODUCT_BOXES" ) {
        return elements.map( ( product, index ) => {
            const isLeftElement = index === currentIndex;

            const productStyles = {
                width: `${ elementWidth }px`,
            };

            return (
                <div className="product-box-wrap" key={ product.key } style={ productStyles }>
                    <Link to="/">
                        <ProductBox
                            product={ product }
                            key={ product.sku }
                            isLeftElement={ isLeftElement }
                        />
                    </Link>
                </div>
            );
        } );
    }

    return [];
}

function selectResponsiveSettings( responsive ) {
    const windowWidth = window.innerWidth;

    switch ( true ) {
        case windowWidth > 1000:
            return responsive[ 3 ];

        case windowWidth > 725:
            return responsive[ 2 ];

        case windowWidth > 480:
            return responsive[ 1 ];

        default:
            return responsive[ 0 ];
    }
}

export default ImageSlider;
