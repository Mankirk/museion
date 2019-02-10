import React, { Component } from "react";

import Subcategory from "./subcategory.react.js";

class Category extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            // categories: [],
        };
    }

    render() {
        const { category } = this.props;
        const subcategories = category.subcategories.map( sub => (
            <Subcategory subcategory={ sub } key={ sub.key } />
        ) );
        return (
            <div className="category">
                <div>
                    <span className="category-name">{category.title}</span>
                    <button className="edit">edit</button>
                    <button className="remove">remove</button>
                </div>
                <div className="subcategories">{subcategories}</div>
            </div>
        );
    }
}

export default Category;
