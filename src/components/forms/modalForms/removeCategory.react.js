import React from "react";
import { connect } from "react-redux";
import { sitemapOperations } from "../../../redux/ducks/sitemap";
import { modalOperations } from "../../../redux/ducks/modals";

const RemoveCategory = ( {
    prefilledData,
    // closeModal,
    removeCategory,
    removeSubcategory,
    removeSection,
    removeImage,
    modalType,
} ) => (
    <div className="remove-category">
        <p>Are you sure ?</p>
        <button
            className="delete-btn"
            onClick={ () => {
                if ( modalType === "remove-category" ) {
                    removeCategory( prefilledData );
                    removeImage( prefilledData.image );
                }
                if ( modalType === "remove-subcategory" ) {
                    removeSubcategory( prefilledData );
                    removeImage( prefilledData.image );
                }
                if ( modalType === "remove-section" ) {
                    removeSection( prefilledData );
                }
            } }
        >
            Yes
        </button>
    </div>
);

const mapStateToProps = state => ( {
    prefilledData: state.modals.modalState.prefilledData,
    modalType: state.modals.modalState.type,
} );

const mapDispatchToProps = {
    closeModal: modalOperations.closeModal,
    removeCategory: sitemapOperations.removeCategory,
    removeSubcategory: sitemapOperations.removeSubcategory,
    removeSection: sitemapOperations.removeSection,
    removeImage: sitemapOperations.removeImage,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)( RemoveCategory );
