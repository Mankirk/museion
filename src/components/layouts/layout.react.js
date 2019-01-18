import React, { Component } from "react";
// import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { applicationOperations } from "../../redux/ducks/application";

import Header from "../headers/header.react";
import Footer from "../footers/footer.react";
import BackToTopArrow from "../backToTopArrow/backToTopArrow.react";

import "./normalize.scss";
import "./layout.scss";

class Layout extends Component {
    componentDidMount() {
        this.saveWindowSize();
        window.addEventListener( "resize", this.saveWindowSize );
    }

    saveWindowSize() {
        const { setWindowHeight, setWindowWidth } = this.props;
        setWindowWidth( window.innerWidth );
        setWindowHeight( window.innerHeight );
    }

    render() {
        const placeholder = [];

        // for ( let i = 0; i <= 200; i++ ) {
        //     placeholder.push( <p>
        //             Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas, ullam rerum
        //             hic vero nisi modi obcaecati itaque explicabo dicta iure, laborum adipisci quo
        //             aliquid ipsam voluptate, quibusdam nemo cum accusantium.
        //     </p> );
        // }

        return (
            <div className="app-root">
                <Header />
                <div className="main-content">{placeholder}</div>
                <Footer />
                <BackToTopArrow />
            </div>
        );
    }
}

const mapStateToProps = state => ( {
    height: state.application.height,
    width: state.application.width,
} );

const mapDispatchToProps = {
    setWindowHeight: applicationOperations.setWindowHeight,
    setWindowWidth: applicationOperations.setWindowWidth,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)( Layout );
