import React, { Component } from "react";
// import { connect } from "react-redux";

import Section from "./section.react";

class Subcategory extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            // categories: [],
        };
    }

    render() {
        const { subcategory } = this.props;
        const sections = subcategory.sections.map( section => (
            <Section section={ section } key={ section.key } />
        ) );
        return (
            <div className="subcategory">
                <div>
                    <span className="category-name">{subcategory.title}</span>
                    <button className="edit">edit</button>
                    <button className="remove">remove</button>
                </div>
                <div className="sections">
                    {sections}
                    <div className="create-subcategory">
                        <button className="add-btn" onClick={ console.log( "create SEction" ) }>
                            Add Section
                        </button>
                    </div>
                </div>

                <div className="create-subcategory">
                    <button className="add-btn" onClick={ console.log( "create Subcategory" ) }>
                        Add Subcategory
                    </button>
                </div>
            </div>
        );
    }
}

export default Subcategory;
