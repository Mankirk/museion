import React, { Component } from "react";
import { connect } from "react-redux";
import { modalOperations } from "../../redux/ducks/modals";

class Section extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            //  categories: [],
        };
    }

    render() {
        const { section, openModal } = this.props;
        return (
            <div className="section">
                <div>
                    <span className="category-name">{section.title}</span>
                    <button className="edit" onClick={ () => openModal( "edit-section", section ) }>
                        edit
                    </button>
                    <button className="remove" onClick={ () => openModal( "remove-section", section ) }>
                        remove
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
)( Section );
