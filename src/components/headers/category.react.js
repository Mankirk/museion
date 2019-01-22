import React, { Component } from "react";

import Subcategory from "./subcategory.react";

class Category extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            isOpen: false,
        };
        this.toggleCategory = this.toggleCategory.bind( this );
    }

    toggleCategory() {
        this.setState( { isOpen: !this.state.isOpen } );
    }

    render() {
        const { categoryData } = this.props;
        const openClass = this.state.isOpen ? "open" : "";

        let subcategories = [];
        if ( categoryData.subcategories ) {
            subcategories = buildSubcategories( categoryData.subcategories );
        }

        return (
            <li className="category" key={ `${ categoryData.key }` }>
                <p className="title" onClick={ () => this.toggleCategory( categoryData.key ) }>
                    {categoryData.title}
                </p>
                {categoryData.subcategories && (
                    <div className={ `menu-dropdown ${ openClass }` }>
                        <div className="subcategories">{subcategories}</div>
                    </div>
                )}
            </li>
        );
    }
}

function buildSubcategories( subcategories ) {
    return subcategories.map( item => <Subcategory subcategoryData={ item } /> );
}

export default Category;
