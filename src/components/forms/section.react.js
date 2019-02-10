import React, { Component } from "react";
// import { connect } from "react-redux";

class Section extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            //  categories: [],
        };
    }

    render() {
        const { section } = this.props;
        return (
            <div className="section">
                <div>
                    <span className="category-name">{section.title}</span>
                    <button className="edit">edit</button>
                    <button className="remove">remove</button>
                </div>
            </div>
        );
    }
}

export default Section;
