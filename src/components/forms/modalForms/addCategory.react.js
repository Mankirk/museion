import React, { Component } from "react";
import { connect } from "react-redux";
import uid from "uid";

import { sitemapOperations } from "../../../redux/ducks/sitemap";
import { modalOperations } from "../../../redux/ducks/modals";

import "./addCategory.scss";

class CategoryForm extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            file: null,
            category: {},
        };

        this.handleInput = this.handleInput.bind( this );
        this.submit = this.submit.bind( this );
        this.onChange = this.onChange.bind( this );
        this.uploadImage = this.uploadImage.bind( this );
    }

    componentDidMount() {
        // eslint-disable-next-line react/no-did-mount-set-state
        this.setState( { category: this.props.prefilledData } );
    }

    componentWillReceiveProps( nextProps ) {
        if ( nextProps.prefilledData ) {
            this.setState( { category: nextProps.prefilledData } );
        }
    }

    onChange( e ) {
        e.preventDefault();
        const output = document.querySelector( ".img-output" );
        output.src = URL.createObjectURL( e.target.files[ 0 ] );
        this.setState( { file: e.target.files[ 0 ] } );
    }

    handleInput( evt ) {
        const { name, value } = evt.target;
        const currentObj = this.state.category;
        currentObj[ name ] = value;
        this.setState( { category: currentObj } );
    }

    submit( evt ) {
        const {
            createCategory,
            editCategory,
            createSubcategory,
            modalType,
            prefilledData,
            editSubcategory,
            createSection,
            editSection,
        } = this.props;
        evt.preventDefault();

        if ( modalType === "add-category" && this.state.file ) {
            const imageType = this.state.file
                ? this.state.file.name.split( "." )[ this.state.file.name.split( "." ).length - 1 ]
                : null;

            const data = this.state.category;
            data.key = uid( 10 );
            createCategory( data, imageType );
            this.uploadImage( "categories" );
        }
        if ( modalType === "edit-category" ) {
            editCategory( this.state.category );

            if ( this.state.file ) {
                this.uploadImage( "categories" );
            }
        }

        if ( modalType === "add-subcategory" && this.state.file ) {
            const imageType = this.state.file
                ? this.state.file.name.split( "." )[ this.state.file.name.split( "." ).length - 1 ]
                : null;

            const data = this.state.category;
            data.key = uid( 10 );
            createSubcategory(
                Object.assign( {}, data, {
                    parentKey: prefilledData.parentKey,
                    parentTitle: prefilledData.parentTitle,
                } ),
                imageType
            );
            this.uploadImage( "subcategories" );
        }

        if ( modalType === "edit-subcategory" ) {
            editSubcategory( this.state.category );

            if ( this.state.file ) {
                this.uploadImage( "subcategories" );
            }
        }

        if ( modalType === "add-section" ) {
            const data = this.state.category;
            data.key = uid( 10 );
            createSection( Object.assign( {}, data, {
                parentKey: prefilledData.parentKey,
                parentTitle: prefilledData.parentTitle,
                gParentKey: prefilledData.gParentKey,
                gParentTitle: prefilledData.gParentTitle,
            } ) );
        }

        if ( modalType === "edit-section" ) {
            editSection( this.state.category );
        }
    }

    uploadImage( destination ) {
        const formData = new FormData();
        formData.append( "myImage", this.state.file );

        // eslint-disable-next-line compat/compat
        fetch( "http://localhost:3030/uploadImg", {
            method: "POST",
            body: formData,
            headers: {
                multerHint: this.state.category.key,
                imageDestination: destination,
            },
        } );
    }

    render() {
        const { prefilledData, modalType } = this.props;
        const isSectionModal =
            modalType === "add-section" ||
            modalType === "edit-section" ||
            modalType === "remove-section";
        const imageSrc = prefilledData && prefilledData.image ? prefilledData.image : "";
        return (
            <div className="category-form">
                <input
                    type="text"
                    placeholder="Title"
                    defaultValue={ this.state.category.title }
                    name="title"
                    onChange={ this.handleInput }
                />
                {!isSectionModal && (
                    <div className="inputs">
                        <input type="file" name="myImage" onChange={ this.onChange } />
                        <div className="image-holder">
                            <img src={ `${ imageSrc }` } alt="alt" className="img-output" />
                        </div>
                    </div>
                )}

                <button onClick={ this.submit }>Submit</button>
            </div>
        );
    }
}

const mapStateToProps = state => ( {
    sitemap: state.sitemap,
    prefilledData: state.modals.modalState.prefilledData,
    modalType: state.modals.modalState.type,
} );

const mapDispatchToProps = {
    closeModal: modalOperations.closeModal,
    createCategory: sitemapOperations.createCategory,
    editCategory: sitemapOperations.editCategory,
    createSubcategory: sitemapOperations.createSubcategory,
    editSubcategory: sitemapOperations.editSubcategory,
    createSection: sitemapOperations.createSection,
    editSection: sitemapOperations.editSection,
    uploadImg: sitemapOperations.uploadImg,
    removeImage: sitemapOperations.removeImage,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)( CategoryForm );
