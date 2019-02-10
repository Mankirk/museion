import React, { Component } from "react";
import { ProductDetailsForm } from "../forms";

import "./cmsProductPage.scss";

class CmsProductPage extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            en: {},
            ro: {},
            common: {},
            images: [],
        };
        this.handleSubmit = this.handleSubmit.bind( this );
    }
    handleSubmit() {
        console.log( "submitting", this.state );
    }

    render() {
        return (
            <div className="cms-product-page">
                this is CMS product PAge
                <ProductDetailsForm />
            </div>
        );
    }
}

export default CmsProductPage;
