import React from "react";

import "./productDescription.scss";

const ProductDescription = ( { product } ) => {
    if ( !product ) {
        return "";
    }

    return (
        <div className="product-description-container">
            <h3 className="desc-title">Description</h3>
            <p className="desc-text">{product.description}</p>
        </div>
    );
};

export default ProductDescription;
