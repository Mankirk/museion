import React from "react";

import "./detailsBox.scss";

const DetailsBox = ( { product } ) => {
    if ( !product ) {
        return "";
    }

    return (
        <div className="details-box-container">
            <p className="title">{product.name}</p>
            <p className="desc-item single-value">
                <span className="item-value">{product.subTitle}</span>
            </p>

            <p className="desc-item">
                <span className="item-name">Art.Nr:</span>
                <span className="item-value">{product.sku}</span>
            </p>
        </div>
    );
};

export default DetailsBox;
