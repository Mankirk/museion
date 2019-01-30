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
        const { productList, screenWidth } = this.props;

        const products = buildProducts( productList, screenWidth );

        return <div className="product-grid">{products}</div>;
    }
}

function buildProducts( products, screenWidth ) {
    return products.map( ( product, index ) => {
        const isLeftElement = findLeftElement( index, screenWidth );
        return (
            <div className="product-box-wrap" key={ product.sku + index }>
                <Link to={ product.slug }>
                    <ProductBox product={ product } isLeftElement={ isLeftElement } />
                </Link>
            </div>
        );
    } );
}

function findLeftElement( index, screenWidth ) {
    if ( screenWidth < 1000 && ( index + 1 ) % 3 === 1 ) {
        return true;
    }

    if ( ( screenWidth > 1000, ( index + 1 ) % 4 === 1 ) ) {
        return true;
    }

    return false;
}

const mapStateToProps = state => ( {
    productList: state.product.list,
    screenWidth: state.application.screenWidth,
} );

const mapDispatchToProps = {
    fetchProducts: productOperations.fetchProducts,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)( ProductGrid );
