import React, { Component } from "react";
import { connect } from "react-redux";
import { modalOperations } from "../../redux/ducks/modals";
import Category from "./category.react";
import "./categoriesForm.scss";

class CategoriesForm extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            // categories: [],
        };
    }

    render() {
        const { sitemap, openModal } = this.props;
        const categories = sitemap.sitemap.map( category => (
            <Category category={ category } key={ category.key } />
        ) );
        return (
            <div className="categories-form">
                Edit Categories Form
                <div className="categories">{categories}</div>
                <button className="add-category" onClick={ () => openModal( "add-category", {} ) }>
                    Add Category
                </button>
            </div>
        );
    }
}

const mapStateToProps = state => ( {
    sitemap: state.sitemap,
} );

const mapDispatchToProps = {
    openModal: modalOperations.openModal,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)( CategoriesForm );
