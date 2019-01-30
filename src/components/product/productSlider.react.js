import React from "react";
import { connect } from "react-redux";
import { productOperations } from "../../redux/ducks/product";

import ImageSlider from "../imageSlider";

import "./productSlider.scss";

const sliderSettings = {
    elementWidth: 250,
    slidesToShow: 4,
    responsive: [
        {
            bp: 0,
            slidesToShow: 1,
            dots: false,
        },
        {
            bp: 480,
            slidesToShow: 2,
            dots: false,
        },
        {
            bp: 725,
            slidesToShow: 3,
            dots: false,
        },
        {
            bp: 1000,
            slidesToShow: 4,
            dots: false,
        },
    ],
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
