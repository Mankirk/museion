import React from "react";
import { connect } from "react-redux";
import { productOperations } from "../../redux/ducks/product";

import ImageSlider from "../imageSlider";

import "./productSlider.scss";

const sliderSettings = {
    elementWidth: 250,
    elementsToDisplay: 4,
};

const ProductSlider = ( { products } ) => {
    if ( !products ) {
        return "";
    }

    const numberOfProducts = products.length;

    return (
        <div className="product-slider">
            <ImageSlider
                elements={ products }
                type="PRODUCT_BOXES"
                numberOfImages={ numberOfProducts }
                sliderSettings={ sliderSettings }
            />
        </div>
    );
};

const mapStateToProps = state => ( {
    products: state.product.list,
} );

const mapDispatchToProps = {
    fetchProducts: productOperations.fetchProducts,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)( ProductSlider );
