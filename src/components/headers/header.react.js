import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Dictionary } from "../../helpers";

import { productOperations } from "../../redux/ducks/product";
import "./header.scss";

const HeaderDesktop = ( { setLanguage, scrolledPastTop, categoryMap, fetchProducts } ) => {
    const shadowClass = scrolledPastTop ? "shadow" : "";
    const categories = buildCategories( categoryMap, fetchProducts );
    return (
        <div className={ `header ${ shadowClass }` }>
            <div className="header-container">
                <div className="top-register">
                    <Link to="/">
                        <img className="header-logo" src="images/main-logo.png" alt="" />
                    </Link>

                    <h2>{Dictionary[ window.userLang ].header.contactInfo}</h2>
                    <div className="lang-choice">
                        <img
                            src="images/uk-flag-icon.png"
                            alt=""
                            onClick={ () => setLanguage( "en" ) }
                        />
                        <img
                            src="images/romania-flag-icon.png"
                            alt=""
                            onClick={ () => setLanguage( "ro" ) }
                        />
                    </div>
                </div>
                <div className="bottom-register">
                    <ul className="categories">{categories}</ul>
                </div>
            </div>
        </div>
    );
};

function buildCategories( categories, fetchProducts ) {
    return categories.map( ( category, i ) => {
        const subcategories = category.subcategories
            ? buildSubcategories( category, fetchProducts )
            : null;

        const noCategoryClass = subcategories ? "" : "hide-dropdown";

        return (
            <li className="category" key={ `${ category.title }${ i }` }>
                <Link
                    to={ `/${ category.url }` }
                    onClick={ () => fetchProducts( { category: category.title } ) }
                >
                    <span className="title">{category.title}</span>
                </Link>
                <div className={ `menu-dropdown ${ noCategoryClass }` }>
                    <div className="subcategories">{subcategories}</div>
                </div>
            </li>
        );
    } );
}

function buildSubcategories( category, fetchProducts ) {
    return category.subcategories.map( ( sub, i ) => {
        const sections = sub.sections ? buildSections( sub, fetchProducts, category ) : null;
        return (
            <div className="subcategory" key={ `${ sub.title }${ i }` }>
                <Link
                    to={ `/${ sub.url }` }
                    onClick={ () =>
                        fetchProducts( { category: category.title, subcategory: sub.title } )
                    }
                >
                    <span className="sub-title">{sub.title}</span>
                </Link>
                <ul className="sections">{sections}</ul>
            </div>
        );
    } );
}

function buildSections( subcategory, fetchProducts, category ) {
    return subcategory.sections.map( ( section, index ) => (
        <li className="section" key={ `${ section.title }${ index }` }>
            <Link
                to={ `/${ section.url }` }
                onClick={ () =>
                    fetchProducts( {
                        category: category.title,
                        subcategory: subcategory.title,
                        section: section.title,
                    } )
                }
            >
                {section.title}
            </Link>
        </li>
    ) );
}

const mapDispatchToProps = {
    fetchProducts: productOperations.fetchProducts,
};

export default connect(
    null,
    mapDispatchToProps
)( HeaderDesktop );
