import React from "react";

import "./backToTopArrow.scss";

const BackToTopArrow = () => {
    console.log();
    return <button className="back-to-top" onClick={ scrollTop() } />;
};

function scrollTop() {
    console.log( "scrolling top" );
}

export default BackToTopArrow;
