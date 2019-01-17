import React, { Component } from "react";
// import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { applicationOperations } from "../../redux/ducks/application";

import Header from "../headers/header.react";
import Footer from "../footers/footer.react";

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
        return (
            <div className="app-root">
                <Header />
                <p>Content Dude</p>
                <Footer />
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
