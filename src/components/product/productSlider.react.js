import React from "react";
import { connect } from "react-redux";
import { productOperations } from "../../redux/ducks/product";

import { Link } from "react-router-dom";
import ImageSlider from "../imageSlider";
import ProductBox from "./productBox.react";

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
    const boxes = buildBoxes( products );

    return (
        <div className="product-slider">
            <ImageSlider
                elements={ boxes }
                numberOfImages={ numberOfProducts }
                sliderSettings={ sliderSettings }
            />
        </div>
    );
};

function buildBoxes( products ) {
    return products.map( product => (
        <div className="product-box-wrap" key={ product.key }>
            <Link to="/">
                <ProductBox product={ product } key={ product.sku } />
            </Link>
        </div>
    ) );
}

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
