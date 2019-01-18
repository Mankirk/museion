import React from "react";
import { connect } from "react-redux";

import { applicationOperations } from "../../redux/ducks/application";

import { Dictionary } from "../../helpers";

import "./header.scss";

const categoryMap = [
    {
        title: "Novelties",
        subcategories: [
            {
                title: "Subcategory1Subcategory1Subcategory1Subcategory1Subcategory1",
                sections: [
                    "Elem1Elem1Elem1Elem1",
                    "Elem2Elem2Elem2Elem2Elem2Elem2Elem2",
                    "Elem3",
                    "Elem4",
                    "Elem5",
                ],
            },
            { title: "Subcategory2", sections: [ "Elem1", "Elem2", "Elem3", "Elem4", "Elem5" ] },
            { title: "Subcategory3", sections: [ "Elem1", "Elem2", "Elem3", "Elem4", "Elem5" ] },
            { title: "Subcategory4", sections: [ "Elem1", "Elem2", "Elem3", "Elem4", "Elem5" ] },
            { title: "Subcategory5", sections: [ "Elem1", "Elem2", "Elem3", "Elem4", "Elem5" ] },
        ],
    },
    { title: "Themes" },
    {
        title: "Magnets",
        subcategories: [
            { title: "Subcategory1", sections: [ "Elem1", "Elem2", "Elem3", "Elem4", "Elem5" ] },
            { title: "Subcategory2", sections: [ "Elem1", "Elem2", "Elem3", "Elem4", "Elem5" ] },
            { title: "Subcategory3", sections: [ "Elem1", "Elem2", "Elem3", "Elem4", "Elem5" ] },
            { title: "Subcategory4", sections: [ "Elem1", "Elem2", "Elem3", "Elem4", "Elem5" ] },
            { title: "Subcategory5", sections: [ "Elem1", "Elem2", "Elem3", "Elem4", "Elem5" ] },
        ],
    },
    { title: "Papeterie" },
    { title: "Jewelry" },
    { title: "Replicas" },
    { title: "Nice&Usefull" },
    { title: "Sale" },
];

const Header = ( { setLanguage } ) => {
    console.log();

    const categories = buildCategories( categoryMap );

    return (
        <div className="header">
            <div className="top-register">
                <img src="images/main-logo.png" alt="" />
                <h2>{Dictionary[ window.userLang ].header.contactInfo}</h2>
                <div className="lang-choice">
                    <img src="images/uk-flag-icon.png" alt="" onClick={ () => setLanguage( "en" ) } />
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
        <li className="section" key={ `${ section }${ index }` }>
            {section}
        </li>
    ) );
}

const mapDispatchToProps = {
    setLanguage: applicationOperations.setLanguage,
};

export default connect(
    null,
    mapDispatchToProps
)( Header );
