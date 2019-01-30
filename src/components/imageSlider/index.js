import React, { Component } from "react";

import { Link } from "react-router-dom";
import { ProductBox } from "../product";
import "./slider.scss";

class ImageSlider extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            currentIndex: 0,
        };

        this.prev = this.prev.bind( this );
        this.next = this.next.bind( this );
    }

    prev() {
        const prevIndex = this.state.currentIndex - 1;
        if ( prevIndex > -1 ) {
            this.setState( { currentIndex: prevIndex } );
        }
    }

    next() {
        const { numberOfImages } = this.props;
        const { elementsToDisplay } = this.props.sliderSettings;

        const nextIndex = this.state.currentIndex + 1;
        if ( nextIndex < numberOfImages - elementsToDisplay + 1 ) {
            this.setState( { currentIndex: nextIndex } );
        }
    }

    render() {
        const { currentIndex } = this.state;
        const { elements, type, numberOfImages, sliderSettings } = this.props;
        const { elementWidth, elementsToDisplay } = sliderSettings;

        const trackWidth = elementWidth * numberOfImages;

        const displayElements = buildDisplayElements( elements, type, currentIndex );

        const atLeftEnd = currentIndex === 0;
        const atRightEnd = numberOfImages - elementsToDisplay === currentIndex;

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

function buildDisplayElements( elements, type, currentIndex ) {
    if ( type === "PRODUCT_BOXES" ) {
        return elements.map( ( product, index ) => {
            const isLeftElement = index === currentIndex;
            return (
                <div className="product-box-wrap" key={ product.key }>
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

export default ImageSlider;
