import React from "react";
import { connect } from "react-redux";
import { modalOperations } from "../../redux/ducks/modals";
import { CategoryForm } from "../forms/modalForms";

import "./modals.scss";

function chooseForm( type ) {
    switch ( type ) {
        case "add-category":
            return <CategoryForm />;

        default:
            return <p>No Form Matches</p>;
    }
}

const Modal = ( { closeModal, modalIsOpen, modalType } ) => {
    // console.log( "modal forms", CategoryForm );
    const openClass = modalIsOpen ? "open" : "closed";
    const form = chooseForm( modalType );
    return (
        <div className={ `shadow ${ openClass }` }>
            <div className="modal">
                <div className="close">
                    <i
                        className="far fa-times-circle"
                        onClick={ () => {
                            closeModal();
                        } }
                    />
                </div>
                {form}
            </div>
        </div>
    );
};

const mapStateToProps = state => ( {
    modalIsOpen: state.modals.modalState.open,
    modalType: state.modals.modalState.type,
} );

const mapDispatchToProps = {
    closeModal: modalOperations.closeModal,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)( Modal );
