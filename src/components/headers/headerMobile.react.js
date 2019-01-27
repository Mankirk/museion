import React, { Component } from "react";
import { Link } from "react-router-dom";
import Category from "./category.react";
import "./headerMobile.scss";

class HeaderMobile extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            menuOpen: false,
        };

        this.toggleMenu = this.toggleMenu.bind( this );
    }

    toggleMenu() {
        this.setState( { menuOpen: !this.state.menuOpen } );
    }

    render() {
        const { /* setLanguage, */ scrolledPastTop, categoryMap } = this.props;

        const shadowClass = scrolledPastTop ? "shadow" : "";
        const menuClass = this.state.menuOpen ? "open" : "closed";
        const categories = buildCategories( categoryMap );

        return (
            <div className={ `header-mobile ${ menuClass } ${ shadowClass }` }>
                <div className="permanent-header">
                    <Link to="/">
                        <img className="header-logo" src="images/main-logo.png" alt="" />
                    </Link>

                    <i className="fas fa-bars" onClick={ () => this.toggleMenu() } />
                </div>
                <ul className="mobile-menu ">{categories}</ul>
            </div>
        );
    }
}

function buildCategories( categories ) {
    return categories.map( ( category, i ) => (
        <Category categoryData={ category } key={ category.title + i } />
    ) );
}

export default HeaderMobile;
