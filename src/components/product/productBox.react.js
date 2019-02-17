import React from "react";

import ProductImage from "./productImage.react";
import SideSlide from "./sideSlide.react";

import "./productBox.scss";

const ProductBox = ( { product, isLeftElement } ) => {
    const showAdditionalImages = product.images && product.images.length > 1;

    const sideSlideClass = showAdditionalImages ? "side-slide-active" : "";
    const sideSlideDirection = isLeftElement ? "right" : "left";

    return (
        <div className={ `product-box ${ sideSlideClass } ${ sideSlideDirection }` }>
            {showAdditionalImages && sideSlideDirection === "left" && (
                <SideSlide images={ product.images.slice( 1 ) } />
            )}
            <div className="permanent-content">
                <div className="image-box">
                    <ProductImage product={ product } />
                </div>
                <div className="product-details">
                    <h3 className="product-title">{product.en.name} </h3>
                    <h4 className="product-subtitle">{product.en.subtitle}</h4>
                    <p className="product-description">{product.en.description}</p>
                </div>
            </div>
            {showAdditionalImages && sideSlideDirection === "right" && (
                <SideSlide images={ product.images.slice( 1 ) } />
            )}
        </div>
    );
};

export default ProductBox;
