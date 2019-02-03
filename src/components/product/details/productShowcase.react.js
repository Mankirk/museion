import React from "react";

import "./productShowcase.scss";

const ProductShowcase = ( { product } ) => {
    if ( !product ) {
        return "";
    }

    return (
        <div className="product-showcase">
            <p className="title">{product.name}</p>

            <div className="main-image">
                <img src="/images/placeholder1.jpeg" alt="" />
            </div>
            <div className="sidebar">
                <div className="image-wrapper">
                    <img src="/images/placeholder2.jpeg" alt="" />
                </div>

                <div className="image-wrapper">
                    <img src="/images/placeholder3.jpg" alt="" />
                </div>
            </div>
        </div>
    );
};

export default ProductShowcase;
