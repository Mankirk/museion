import React, { Component } from "react";

class Subcategory extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            isOpen: false,
        };
        this.toggleSubCategory = this.toggleSubcategory.bind( this );
    }

    toggleSubcategory() {
        this.setState( { isOpen: !this.state.isOpen } );
    }

    render() {
        const { subcategoryData } = this.props;

        const subOpenClass = this.state.isOpen ? "open" : "";

        let sections = [];
        if ( subcategoryData.sections ) {
            sections = buildSections( subcategoryData.sections );
        }

        return (
            <div className="subcategory" key={ `${ subcategoryData.title }` }>
                <p className="sub-title" onClick={ () => this.toggleSubCategory() }>
                    {subcategoryData.title}
                </p>
                {subcategoryData.sections && (
                    <ul className={ `sections ${ subOpenClass }` }>{sections}</ul>
                )}
            </div>
        );
    }
}

function buildSections( sections ) {
    return sections.map( item => <li className="section">{item}</li> );
}

export default Subcategory;
