import React, { Component } from "react";
import { connect } from "react-redux";

import { applicationOperations } from "../../redux/ducks/application";

import Header from "../headers";
import Footer from "../footers/footer.react";
import BackToTopArrow from "../backToTopArrow/backToTopArrow.react";
import { ProductGrid, ProductSlider } from "../product";

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

        return (
            <div className="app-root">
                <Header scrolledPastTop={ this.state.scrolledPastTop } />
                <div className="main-content">
                    <ProductSlider />
                    <ProductGrid />
                    {placeholder}
                </div>
                <Footer />
                <BackToTopArrow scrolledPastTop={ this.state.scrolledPastTop } />
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
