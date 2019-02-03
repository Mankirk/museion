import React from "react";

import { ProductGrid } from "../product";
import Breadcrumbs from "../breadcrumbs";

const ProductListPage = () => (
    <div className="product-list-page">
        <Breadcrumbs />
        <ProductGrid />
    </div>
);

export default ProductListPage;
