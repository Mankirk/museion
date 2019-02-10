import React, { Component } from "react";
// import { connect } from "react-redux";

class CategoryForm extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            title: "",
            image: [],
        };

        this.handleInput = this.handleInput.bind( this );
        this.handleImageInput = this.handleImageInput.bind( this );
        this.submit = this.submit.bind( this );
    }

    handleInput( evt ) {
        const { name, value } = evt.target;
        const updatedValue = {};
        updatedValue[ name ] = value;
        this.setState( updatedValue );
    }

    handleImageInput( evt ) {
        const { files } = evt.target;
        this.setState( { image: files } );
    }

    submit() {
        console.log( "submit add btn", this.state );
    }

    render() {
        return (
            <div className="category-form">
                <div className="inputs">
                    <input
                        type="text"
                        placeholder="Title"
                        name="title"
                        onChange={ this.handleInput }
                    />
                    <input type="file" name="image" onChange={ this.handleImageInput } />
                </div>
                <button onClick={ this.submit }>Submit</button>
            </div>
        );
    }
}

export default CategoryForm;
