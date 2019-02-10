import React, { Component } from "react";

import "./forms.scss";

class ProductDetailsForm extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            en: {
                name: "",
                subtitle: "",
                type: "",
                description: "",
            },
            ro: {
                name: "",
                subtitle: "",
                type: "",
                description: "",
            },
            common: { sku: "", category: "", subCategory: "", section: "" },
            images: [],
        };

        this.handleEnInput = this.handleEnInput.bind( this );
        this.handleRoInput = this.handleRoInput.bind( this );
        this.handleCommonInput = this.handleCommonInput.bind( this );
        this.handleImageInput = this.handleImageInput.bind( this );
        this.handleSubmit = this.handleSubmit.bind( this );
    }

    handleSubmit() {
        console.log( "submitting", this.state );
    }

    handleEnInput( evt ) {
        const { name, value } = evt.target;
        const updatedValue = {};
        updatedValue[ name ] = value;
        this.setState( updatedValue );
    }

    handleRoInput( evt ) {
        const { name, value } = evt.target;
        const updatedValue = {};
        updatedValue[ name ] = value;
        this.setState( updatedValue );
    }

    handleCommonInput( evt ) {
        const { name, value } = evt.target;
        const updatedValue = {};
        updatedValue[ name ] = value;
        this.setState( updatedValue );
    }

    handleImageInput( evt ) {
        const { files } = evt.target;
        this.setState( { images: files } );
    }

    render() {
        return (
            <div className="form cms-product-form">
                <h3 className="cms-product-form">Edit Product</h3>
                <div className="image-form">
                    This IS image form
                    <input type="file" name="files[]" multiple onChange={ this.handleImageInput } />
                </div>
                <div className="main-forms">
                    <div className="inputs en">
                        <input
                            className="input-normal"
                            type="text"
                            placeholder="Name"
                            name="name"
                            onChange={ this.handleEnInput }
                        />
                        <input
                            className="input-normal"
                            type="text"
                            placeholder="Subtitle"
                            name="subtitle"
                            onChange={ this.handleEnInput }
                        />
                        <input
                            className="input-normal"
                            type="text"
                            placeholder="Type"
                            name="type"
                            onChange={ this.handleEnInput }
                        />

                        <input
                            className="input-normal"
                            type="text"
                            placeholder="Description"
                            name="description"
                            onChange={ this.handleEnInput }
                        />
                    </div>

                    <div className="inputs ro">
                        <input
                            className="input-normal"
                            type="text"
                            placeholder="Name"
                            name="name"
                            onChange={ this.handleRoInput }
                        />
                        <input
                            className="input-normal"
                            type="text"
                            placeholder="Subtitle"
                            name="subtitle"
                            onChange={ this.handleRoInput }
                        />
                        <input
                            className="input-normal"
                            type="text"
                            placeholder="Type"
                            name="type"
                            onChange={ this.handleRoInput }
                        />

                        <input
                            className="input-normal"
                            type="text"
                            placeholder="Description"
                            name="description"
                            onChange={ this.handleRoInput }
                        />
                    </div>
                </div>
                <div className="form product-common-fields">
                    <input
                        className="input-normal"
                        type="text"
                        placeholder="Category"
                        name="category"
                        onChange={ this.handleCommonInput }
                    />
                    <input
                        className="input-normal"
                        type="text"
                        placeholder="Sku"
                        name="sku"
                        onChange={ this.handleCommonInput }
                    />
                    <input
                        className="input-normal"
                        type="text"
                        placeholder="Subcategory"
                        name="subCategory"
                        onChange={ this.handleCommonInput }
                    />
                    <input
                        className="input-normal"
                        type="text"
                        placeholder="Section"
                        name="section"
                        onChange={ this.handleCommonInput }
                    />
                </div>
                <button className="submit-product-forms" onClick={ this.handleSubmit }>
                    Submit
                </button>
            </div>
        );
    }
}

export default ProductDetailsForm;
