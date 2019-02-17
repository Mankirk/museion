import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import uid from "uid";

import { productOperations } from "../../redux/ducks/product";

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
            sku: "",
            category: { title: "", key: "" },
            subcategory: { title: "", key: "" },
            section: { title: "", key: "" },
            files: [],
        };

        this.handleEnInput = this.handleEnInput.bind( this );
        this.handleRoInput = this.handleRoInput.bind( this );
        this.handleCommonInput = this.handleCommonInput.bind( this );
        this.handleImageInput = this.handleImageInput.bind( this );
        this.handleSubmit = this.handleSubmit.bind( this );
        this.uploadImages = this.uploadImages.bind( this );
    }

    handleSubmit() {
        const { createProduct } = this.props;

        const productBody = this.state;

        const productKey = uid( 20 );
        productBody.key = productKey;
        const images = Array.from( this.state.files ).map( ( file, i ) => `${ productKey }-id:${ i }.${ file.type.split( "/" )[ 1 ] }` );

        productBody.images = images;

        const subcategoryPath = this.state.subcategory ? `/${ this.state.subcategory.title }` : "";
        const sectionPath = this.state.section ? `/${ this.state.section.title }` : "";
        productBody.slug = `product/${ this.state.category.title }${ subcategoryPath }${ sectionPath }`;

        console.log( "body", productBody );

        if ( Array.from( this.state.files ).length !== 0 ) {
            createProduct( productBody );
            this.uploadImages( "products", productKey );
        }
    }

    uploadImages( destination, key ) {
        const formData = new FormData();

        this.state.files.forEach( ( file, i ) => {
            formData.append( "myImage", file, `${ key }-id:${ i }` );
        } );

        // eslint-disable-next-line compat/compat
        fetch( "http://localhost:3030/uploadImages", {
            method: "POST",
            body: formData,
            headers: {
                imageDestination: destination,
            },
        } );
    }

    handleEnInput( evt ) {
        const { name, value } = evt.target;
        const newStateGroup = this.state.en;
        newStateGroup[ name ] = value;
        this.setState( { en: newStateGroup } );
    }

    handleRoInput( evt ) {
        const { name, value } = evt.target;
        const newStateGroup = this.state.ro;
        newStateGroup[ name ] = value;
        this.setState( { ro: newStateGroup } );
    }

    handleCommonInput( evt ) {
        const { name, value } = evt.target;
        const newField = {};
        newField[ name ] = value;
        this.setState( newField );
    }

    handleImageInput( e ) {
        e.preventDefault();
        const allFiles = [ ...this.state.files, ...e.target.files ];
        this.setState( { files: allFiles } );
    }

    render() {
        const { sitemap } = this.props;
        // console.log( "state", this.state );
        const inputImages = Array.from( this.state.files ).map( ( file, i ) => (
            <div className="image-holder" key={ i }>
                <img src={ `${ URL.createObjectURL( file ) }` } alt="alt" />
            </div>
        ) );
        const categories = sitemap.map( category => ( {
            key: category.key,
            title: category.title,
        } ) );
        const categoryOptions = categories.map( category => (
            <option value={ { key: category.key, title: category.title } }>{category.title}</option>
        ) );

        const selectedCategory =
            this.state.category.key !== ""
                ? sitemap.find( cat => cat.key === this.state.category.key )
                : "";
        const selectedSubcat =
            this.state.subcategory.key !== ""
                ? selectedCategory.subcategories.find( sub => sub.key === this.state.subcategory.key )
                : "";

        return (
            <div className="form cms-product-form">
                <h3 className="cms-product-form">Edit Product</h3>
                <div className="image-form">
                    <div className="images">{inputImages}</div>
                    <input type="file" name="myImage" multiple onChange={ this.handleImageInput } />
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
                        placeholder="Sku"
                        name="sku"
                        value={ this.state.sku }
                        onChange={ this.handleCommonInput }
                    />
                    <p>Category</p>
                    <select name="category" onChange={ this.handleCommonInput }>
                        {categoryOptions}
                    </select>

                    {this.state.category.key !== "" && (
                        <Fragment>
                            <p>Subcategory</p>
                            <select name="subcategory" onChange={ this.handleCommonInput }>
                                {getSubcategories( selectedCategory )}
                            </select>
                        </Fragment>
                    )}

                    {this.state.subcategory.key !== "" && (
                        <Fragment>
                            <p>Section</p>
                            <select name="section" onChange={ this.handleCommonInput }>
                                {getSections( selectedSubcat )}
                            </select>
                        </Fragment>
                    )}
                </div>
                <button className="submit-product-forms" onClick={ this.handleSubmit }>
                    Submit
                </button>
            </div>
        );
    }
}

function getSubcategories( category ) {
    const subcategories = category.subcategories.map( sub => (
        <option value={ { key: sub.key, title: sub.title } } key={ sub.key }>
            {sub.title}
        </option>
    ) );

    return subcategories;
}

function getSections( sub ) {
    const sections = sub.sections.map( section => (
        <option value={ { key: section.key, title: section.title } } key={ section.key }>
            {section.title}
        </option>
    ) );

    return sections;
}

const mapStateToProps = state => ( {
    sitemap: state.sitemap.sitemap,
} );

const mapDispatchToProps = {
    createProduct: productOperations.createProduct,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)( ProductDetailsForm );
