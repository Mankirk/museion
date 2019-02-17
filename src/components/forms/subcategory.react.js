import React, { Component } from "react";
import { connect } from "react-redux";
import { modalOperations } from "../../redux/ducks/modals";

import Section from "./section.react";

class Subcategory extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            // categories: [],
        };
    }

    render() {
        const { subcategory, openModal, category } = this.props;
        const sections = subcategory.sections.map( section => (
            <Section section={ section } key={ section.key } />
        ) );
        return (
            <div className="subcategory">
                <div>
                    <span className="category-name">{subcategory.title}</span>
                    <button
                        className="edit"
                        onClick={ () => openModal( "edit-subcategory", subcategory ) }
                    >
                        edit
                    </button>
                    <button
                        className="remove"
                        onClick={ () => openModal( "remove-subcategory", subcategory ) }
                    >
                        remove
                    </button>
                </div>
                <div className="sections">
                    {sections}
                    <div className="create-subcategory">
                        <button
                            className="add-btn"
                            onClick={ () =>
                                openModal( "add-section", {
                                    parentKey: subcategory.key,
                                    parentTitle: subcategory.title,
                                    gParentKey: category.key,
                                    gParentTitle: category.title,
                                } )
                            }
                        >
                            Add Section
                        </button>
                    </div>
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
)( Subcategory );
