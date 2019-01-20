import React, { Fragment } from "react";
import { Utils } from "../../helpers";

import "./backToTopArrow.scss";

const BackToTopArrow = ( { scrolledPastTop } ) => (
    <Fragment>
        {scrolledPastTop && (
            <button className="back-to-top" onClick={ scrollTop }>
                <i className="fas fa-chevron-up" />
            </button>
        )}
    </Fragment>
);

function scrollTop() {
    Utils.scrollToElement( window, document.querySelector( "body" ) );
}

export default BackToTopArrow;
