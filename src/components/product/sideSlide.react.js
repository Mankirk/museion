import React from "react";
import { connect } from "react-redux";

const SideSlide = ( { images, screenWidth } ) => {
    if ( screenWidth < 725 ) {
        return "";
    }
    const imageElements = buildImages( images );

    return <div className="hover-content">{imageElements}</div>;
};

function buildImages( images ) {
    return images.map( image => (
        <img src={ `/images/products/${ image }` } alt={ image } key={ image.url } />
    ) );
}

const mapStateToProps = state => ( {
    screenWidth: state.application.screenWidth,
} );

export default connect( mapStateToProps )( SideSlide );
