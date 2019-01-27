import React from "react";

import ProductImage from "./productImage.react";
import SideSlide from "./sideSlide.react";

import "./productBox.scss";

const ProductBox = ( { product } ) => {
    const showAdditionalImages =
        product.images && product.images.additional && product.images.additional.length > 0;

    const sideSlideClass = showAdditionalImages ? "side-slide-active" : "";

    return (
        <div className={ `product-box ${ sideSlideClass }` }>
            {showAdditionalImages && <SideSlide images={ product.images.additional } />}
            <div className="permanent-content">
                <div className="image-box">
                    <ProductImage product={ product } />
                </div>
                <div className="product-details">
                    <h3 className="product-title">{product.name} </h3>
                    <h4 className="product-subtitle">{product.subTitle}</h4>
                    <p className="product-description">{product.description}</p>
                </div>
            </div>
        </div>
    );
};

export default ProductBox;
