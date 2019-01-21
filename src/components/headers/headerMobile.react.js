import React, { Component } from "react";

import "./headerMobile.scss";

class HeaderMobile extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            menuOpen: false,
            openCategories: [],
            openSections: [],
        };

        this.toggleMenu = this.toggleMenu.bind( this );
        this.toggleCategory = this.toggleCategory.bind( this );
        this.toggleSection = this.toggleSection.bind( this );
    }

    toggleMenu() {
        this.setState( { menuOpen: !this.state.menuOpen } );
    }

    toggleCategory( categoryKey ) {
        const { openCategories /* , openSections */ } = this.state;

        if ( openCategories.includes( categoryKey ) ) {
            const index = openCategories.indexOf( categoryKey );

            const otherCategories = [
                ...openCategories.slice( 0, index ),
                ...openCategories.slice( index + 1 ),
            ];

            this.setState( { openCategories: otherCategories } );
        } else {
            this.setState( { openCategories: [ ...openCategories, categoryKey ] } );
        }
    }

    toggleSection( sectionName, parentCategoryKey ) {
        const { openCategories, openSections } = this.state;

        if ( openCategories.includes( parentCategoryKey ) ) {
            if ( openSections.includes( parentCategoryKey + sectionName ) ) {
                const index = openSections.indexOf( parentCategoryKey + sectionName );

                const otherSections = [
                    ...openSections.slice( 0, index ),
                    ...openSections.slice( index + 1 ),
                ];

                this.setState( { openSections: otherSections } );
            } else {
                this.setState( { openSections: [ ...openSections, parentCategoryKey + sectionName ] } );
            }
        }
    }
    render() {
        const { /* setLanguage, */ scrolledPastTop, categoryMap } = this.props;
        const { openCategories, openSections } = this.state;

        const shadowClass = scrolledPastTop ? "shadow" : "";
        const menuClass = this.state.menuOpen ? "open" : "closed";
        const categories = buildCategories(
            categoryMap,
            this.toggleCategory,
            this.toggleSection,
            openCategories,
            openSections
        );

        return (
            <div className={ `header-mobile ${ menuClass } ${ shadowClass }` }>
                <div className="permanent-header">
                    <img className="header-logo" src="images/main-logo.png" alt="" />
                    <i className="fas fa-bars" onClick={ () => this.toggleMenu() } />
                </div>
                <ul className="mobile-menu ">{categories}</ul>
            </div>
        );
    }
}

function buildCategories( categories, toggleCategory, toggleSection, openCategories, openSections ) {
    return categories.map( ( category, i ) => {
        const subcategories = category.subcategories
            ? buildSubcategories( category.subcategories, toggleSection, openSections, category.key )
            : null;

        const noCategoryClass = subcategories ? "" : "hide-dropdown";
        const subCategoryOpenClass = openCategories.includes( category.key ) ? "open" : "";

        return (
            <li className="category" key={ `${ category.key }${ i }` }>
                <p className="title" onClick={ () => toggleCategory( category.key ) }>
                    {category.title}
                </p>
                <div className={ `menu-dropdown ${ noCategoryClass } ${ subCategoryOpenClass }` }>
                    <div className="subcategories">{subcategories}</div>
                </div>
            </li>
        );
    } );
}

function buildSubcategories( subcategories, toggleSection, openSections, parentCategoryKey ) {
    return subcategories.map( ( sub, i ) => {
        const sections = sub.sections ? buildSections( sub.sections ) : null;
        const sectionOpenClass = openSections.includes( parentCategoryKey + sub.title ) ? "open" : "";

        return (
            <div className="subcategory" key={ `${ sub.title }${ i }` }>
                <p
                    className="sub-title"
                    onClick={ () => toggleSection( sub.title, parentCategoryKey ) }
                >
                    {sub.title}
                </p>
                <ul className={ `sections ${ sectionOpenClass }` }>{sections}</ul>
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

export default HeaderMobile;
