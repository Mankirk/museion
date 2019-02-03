import React from "react";
import { Link } from "react-router-dom";
import { Dictionary } from "../../helpers";

import "./header.scss";

const HeaderDesktop = ( { setLanguage, scrolledPastTop, categoryMap } ) => {
    const shadowClass = scrolledPastTop ? "shadow" : "";
    const categories = buildCategories( categoryMap );
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

function buildCategories( categories ) {
    return categories.map( ( category, i ) => {
        const subcategories = category.subcategories
            ? buildSubcategories( category.subcategories )
            : null;

        const noCategoryClass = subcategories ? "" : "hide-dropdown";

        return (
            <li className="category" key={ `${ category.title }${ i }` }>
                <span className="title">{category.title}</span>
                <div className={ `menu-dropdown ${ noCategoryClass }` }>
                    <div className="subcategories">{subcategories}</div>
                </div>
            </li>
        );
    } );
}

function buildSubcategories( subcategories ) {
    return subcategories.map( ( sub, i ) => {
        const sections = sub.sections ? buildSections( sub.sections ) : null;
        return (
            <div className="subcategory" key={ `${ sub.title }${ i }` }>
                <span className="sub-title">{sub.title}</span>
                <ul className="sections">{sections}</ul>
            </div>
        );
    } );
}

function buildSections( sections ) {
    return sections.map( ( section, index ) => (
        <li className="section" key={ `${ section.title }${ index }` }>
            {section.title}
        </li>
    ) );
}

export default HeaderDesktop;
