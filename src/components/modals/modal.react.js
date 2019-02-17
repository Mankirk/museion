import React, { Fragment } from "react";
import { connect } from "react-redux";
import { modalOperations } from "../../redux/ducks/modals";
import { CategoryForm, RemoveCategory } from "../forms/modalForms";

import "./modals.scss";

function chooseForm( type ) {
    switch ( type ) {
        case "add-category":
            return (
                <Fragment>
                    <h3 className="modal-header">Create Category</h3>
                    <CategoryForm />
                </Fragment>
            );

        case "edit-category":
            return (
                <Fragment>
                    <h3 className="modal-header">Edit Category</h3>
                    <CategoryForm />
                </Fragment>
            );
        case "remove-category":
            return (
                <Fragment>
                    <h3 className="modal-header">Remove Category</h3>
                    <RemoveCategory />
                </Fragment>
            );

        case "add-subcategory":
            return (
                <Fragment>
                    <h3 className="modal-header">Add Subcategory</h3>
                    <CategoryForm />
                </Fragment>
            );

        case "edit-subcategory":
            return (
                <Fragment>
                    <h3 className="modal-header">Edit Subcategory</h3>
                    <CategoryForm />
                </Fragment>
            );

        case "remove-subcategory":
            return (
                <Fragment>
                    <h3 className="modal-header">Remove Category</h3>
                    <RemoveCategory />
                </Fragment>
            );

        case "add-section":
            return (
                <Fragment>
                    <h3 className="modal-header">Add Section</h3>
                    <CategoryForm />
                </Fragment>
            );

        case "edit-section":
            return (
                <Fragment>
                    <h3 className="modal-header">Edit Section</h3>
                    <CategoryForm />
                </Fragment>
            );

        case "remove-section":
            return (
                <Fragment>
                    <h3 className="modal-header">Remove Section</h3>
                    <RemoveCategory />
                </Fragment>
            );

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
