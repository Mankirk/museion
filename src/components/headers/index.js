import React, { Fragment } from "react";
import { connect } from "react-redux";

import { applicationOperations } from "../../redux/ducks/application";

import HeaderMobile from "./header.react";
import HeaderDesktop from "./headerMobile.react";

const Header = ( { setLanguage, scrolledPastTop, screenWidth, sitemap } ) => {
    if ( Object.keys( sitemap ).length === 0 ) {
        return "";
    }

    return (
        <Fragment>
            {screenWidth < 850 ? (
                <HeaderDesktop
                    setLanguage={ setLanguage }
                    scrolledPastTop={ scrolledPastTop }
                    categoryMap={ sitemap }
                />
            ) : (
                <HeaderMobile
                    setLanguage={ setLanguage }
                    scrolledPastTop={ scrolledPastTop }
                    categoryMap={ sitemap }
                />
            )}
        </Fragment>
    );
};

const mapStateToProps = state => ( {
    screenWidth: state.application.screenWidth,
    sitemap: state.sitemap.sitemap,
} );

const mapDispatchToProps = {
    setLanguage: applicationOperations.setLanguage,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)( Header );
