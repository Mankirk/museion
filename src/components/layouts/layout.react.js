import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { productOperations } from "../../redux/ducks/product";
import { applicationOperations } from "../../redux/ducks/application";
import { sitemapOperations } from "../../redux/ducks/sitemap";
import { baseRoutes } from "../pages/routes";

import Header from "../headers";
import Footer from "../footers/footer.react";
import BackToTopArrow from "../backToTopArrow/backToTopArrow.react";
import Modal from "../modals/modal.react";

import "./normalize.scss";
import "./layout.scss";

class Layout extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            scrolledPastTop: false,
        };

        this.onScroll = this.onScroll.bind( this );
        this.saveWindowSize = this.saveWindowSize.bind( this );
    }
    componentDidMount() {
        const { getSitemap, fetchProducts } = this.props;
        getSitemap();
        fetchProducts();
        this.saveWindowSize();
        window.addEventListener( "resize", this.saveWindowSize );
        window.addEventListener( "scroll", this.onScroll );
    }

    componentWillUnmount() {
        window.removeEventListener( "resize", this.saveWindowSize );
        window.removeEventListener( "scroll", this.onScroll );
    }

    onScroll() {
        if ( window.scrollY > 200 ) {
            this.setState( { scrolledPastTop: true } );
        } else {
            this.setState( { scrolledPastTop: false } );
        }
    }

    saveWindowSize() {
        const { setWindowHeight, setWindowWidth } = this.props;
        setWindowWidth( window.innerWidth );
        setWindowHeight( window.innerHeight );
    }
    render() {
        const placeholder = [];

        // for ( let i = 0; i <= 50; i++ ) {
        //     placeholder.push( <p>
        //             Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas, ullam rerum
        //             hic vero nisi modi obcaecati itaque explicabo dicta iure, laborum adipisci quo
        //             aliquid ipsam voluptate, quibusdam nemo cum accusantium.
        //     </p> );
        // }

        const routeElements = baseRoutes.map( ( route, index ) => (
            // console.log( "route", route );
            <Route key={ index } { ...route } />
        ) );

        return (
            <div className="app-root">
                <Modal />
                <Header scrolledPastTop={ this.state.scrolledPastTop } />
                <div className="main-content">
                    <Switch>{routeElements}</Switch>

                    {placeholder}
                </div>
                <Footer />
                <BackToTopArrow scrolledPastTop={ this.state.scrolledPastTop } />
            </div>
        );
    }
}

const mapStateToProps = state => ( {
    sitemap: state.sitemap,
} );

const mapDispatchToProps = {
    setWindowHeight: applicationOperations.setWindowHeight,
    setWindowWidth: applicationOperations.setWindowWidth,
    getSitemap: sitemapOperations.getSitemap,
    fetchProducts: productOperations.fetchProducts,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)( Layout );
