import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { productOperations } from "../../redux/ducks/product";

import ProductBox from "./productBox.react";
import "./productGrid.scss";

class ProductGrid extends Component {
    componentDidMount() {
        this.fetchProducts();
    }

    fetchProducts() {
        const { fetchProducts } = this.props;

        fetchProducts();
    }

    render() {
        console.log( "renderung" );
        const { productList } = this.props;

        const products = buildProducts( productList );

        return <div className="product-grid">{products}</div>;
    }
}

function buildProducts( products ) {
    return products.map( ( product, index ) => (
        <div className="product-box-wrap" key={ product.sku + index }>
            <Link to={ product.slug }>
                <ProductBox product={ product } />
            </Link>
        </div>
    ) );
}

const mapStateToProps = state => ( {
    productList: state.product.list,
} );

const mapDispatchToProps = {
    fetchProducts: productOperations.fetchProducts,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)( ProductGrid );
