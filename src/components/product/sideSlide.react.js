import React from "react";

const SideSlide = ( { images } ) => {
    console.log();

    const imageElements = buildImages( images );

    return <div className="hover-content">{imageElements}</div>;
};

function buildImages( images ) {
    return images.map( image => <img src="/images/placeholder2.jpeg" alt={ image } /> );
}

export default SideSlide;
