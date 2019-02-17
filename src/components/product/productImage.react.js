import React from "react";

const ProductImage = ( { product } ) => (
    <img
        src={ `${ window.location.origin }/images/products/${ product.images[ 0 ] }` }
        className="prod-img"
        alt="product-img"
    />
);

export default ProductImage;
