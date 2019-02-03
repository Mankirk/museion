import React, { Component } from "react";
import { connect } from "react-redux";
import { productOperations } from "../../redux/ducks/product";
import Breadcrumbs from "../breadcrumbs";
import { ProductShowcase, ProductDescription, DetailsBox } from "../product/details";

import "./productDetailsPage.scss";

class ProductDetailsPage extends Component {
    componentDidMount() {
        this.fetchProducts();
    }

    fetchProducts() {
        const { fetchProducts } = this.props;

        fetchProducts();
    }
    render() {
        const { product } = this.props;

        return (
            <div className="product-details">
                <div className="top-half">
                    <Breadcrumbs />
                    <ProductShowcase product={ product } />
                </div>

                <DetailsBox product={ product } />

                <ProductDescription product={ product } />
            </div>
        );
    }
}

const mapStateToProps = state => ( {
    product: state.product.list[ 0 ],
} );

const mapDispatchToProps = {
    fetchProducts: productOperations.fetchProducts,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)( ProductDetailsPage );
