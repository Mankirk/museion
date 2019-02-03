import React from "react";
import { connect } from "react-redux";
import { ProductGrid } from "../product";
import Breadcrumbs from "../breadcrumbs";
import HeaderMobile from "../headers/headerMobile.react";

import "./productListPage.scss";

const ProductListPage = ( { sitemap } ) => (
    <div className="product-list-page">
        {Object.keys( sitemap ).length !== 0 ? (
            <HeaderMobile categoryMap={ sitemap } scrolledPastTop={ false } inProductList />
        ) : (
            ""
        )}
        <div className="list-proper">
            <Breadcrumbs />
            <ProductGrid />
        </div>
    </div>
);

const mapStateToProps = state => ( {
    sitemap: state.sitemap.sitemap,
} );

const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)( ProductListPage );
