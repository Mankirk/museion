import React, { Component } from "react";
import { connect } from "react-redux";

import { sitemapOperations } from "../../../redux/ducks/sitemap";
import { modalOperations } from "../../../redux/ducks/modals";

class CategoryForm extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            file: null,
            title: "",
        };

        this.handleInput = this.handleInput.bind( this );
        // this.handleImageInput = this.handleImageInput.bind( this );
        this.submit = this.submit.bind( this );
        this.onChange = this.onChange.bind( this );
    }

    // handleInput( evt ) {
    //     const { name, value } = evt.target;
    //     const updatedValue = {};
    //     updatedValue[ name ] = value;
    //     this.setState( updatedValue );
    // }

    onChange( e ) {
        this.setState( { file: e.target.files[ 0 ] } );
    }

    submit( evt ) {
        evt.preventDefault();
        const formData = new FormData();
        formData.append( "myImage", this.state.file );
        formData.append( "title", this.state.title );

        console.log( "form data", formData );
        // fetch( "http://localhost:3030/uploadImg", {
        //     method: "POST",
        //     body: formData,
        //     headers: {
        //         multerHint: this.state.title,
        //     },
        // } )
        //     .then( res => res.json() )
        //     .then( images => {
        //         console.log( images );
        //     } );

        // createCategory( formData /* { title: this.state.title, image: formData } */ );
        // closeModal();
    }

    render() {
        return (
            <div className="category-form">
                <input type="text" placeholder="Title" name="title" onChange={ this.handleInput } />
                <div className="inputs">
                    <input type="file" name="myImage" onChange={ this.onChange } />
                </div>
                <button onClick={ this.submit }>Submit</button>
            </div>
        );
    }
}

/*
<div className="inputs">
    <input
        type="text"
        placeholder="Title"
        name="title"
        onChange={ this.handleInput }
    />

    <input type="file" name="image" multiple onChange={ this.handleImageInput } />
</div>
<button onClick={ this.submit }>Submit</button>
*/

const mapStateToProps = state => ( {
    sitemap: state.sitemap,
} );

const mapDispatchToProps = {
    closeModal: modalOperations.closeModal,
    createCategory: sitemapOperations.createCategory,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)( CategoryForm );
