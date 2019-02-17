import React, { Component } from "react";
import { connect } from "react-redux";
import { modalOperations } from "../../redux/ducks/modals";
import Subcategory from "./subcategory.react.js";

class Category extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            // categories: [],
        };
    }

    render() {
        const { category, openModal } = this.props;
        const subcategories = category.subcategories.map( sub => (
            <Subcategory subcategory={ sub } key={ sub.key } category={ category } />
        ) );
        return (
            <div className="category">
                <div>
                    {" "}
                    <span className="category-name">{category.title}</span>
                    <button className="edit" onClick={ () => openModal( "edit-category", category ) }>
                        edit
                    </button>
                    <button
                        className="remove"
                        onClick={ () => openModal( "remove-category", category ) }
                    >
                        remove
                    </button>
                </div>
                <div className="subcategories">{subcategories}</div>
                <div className="add-subcategory">
                    <button
                        className="add-btn"
                        onClick={ () =>
                            openModal( "add-subcategory", {
                                parentKey: category.key,
                                parentTitle: category.title,
                            } )
                        }
                    >
                        Add Subcategory
                    </button>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = {
    openModal: modalOperations.openModal,
};

export default connect(
    null,
    mapDispatchToProps
)( Category );
