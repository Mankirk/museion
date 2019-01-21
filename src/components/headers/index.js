import React, { Fragment } from "react";
import { connect } from "react-redux";

import { applicationOperations } from "../../redux/ducks/application";

import HeaderMobile from "./header.react";
import HeaderDesktop from "./headerMobile.react";

const categoryMap = [
    {
        title: "Novelties",
        key: "abba",
        subcategories: [
            {
                title: "Subcategory1Subcategory1Subcategory1Subcategory1Subcategory1",
                sections: [
                    "Elem1Elem1Elem1Elem1",
                    "Elem2Elem2Elem2Elem2Elem2Elem2Elem2",
                    "Elem3",
                    "Elem4",
                    "Elem5",
                ],
                key: "abba",
            },
            {
                title: "Subcategory2",
                sections: [ "Elem1", "Elem2", "Elem3", "Elem4", "Elem5" ],
            },
            {
                title: "Subcategory3",
                sections: [ "Elem1", "Elem2", "Elem3", "Elem4", "Elem5" ],
            },
            {
                title: "Subcategory4",
                sections: [ "Elem1", "Elem2", "Elem3", "Elem4", "Elem5" ],
            },
            {
                title: "Subcategory5",
                sections: [ "Elem1", "Elem2", "Elem3", "Elem4", "Elem5" ],
            },
        ],
    },
    { title: "Themes", key: "bbba" },
    {
        title: "Magnets",
        subcategories: [
            { title: "Subcategory1", sections: [ "Elem1", "Elem2", "Elem3", "Elem4", "Elem5" ] },
            { title: "Subcategory2", sections: [ "Elem1", "Elem2", "Elem3", "Elem4", "Elem5" ] },
            { title: "Subcategory3", sections: [ "Elem1", "Elem2", "Elem3", "Elem4", "Elem5" ] },
            { title: "Subcategory4", sections: [ "Elem1", "Elem2", "Elem3", "Elem4", "Elem5" ] },
            { title: "Subcategory5", sections: [ "Elem1", "Elem2", "Elem3", "Elem4", "Elem5" ] },
        ],
        key: "cbba",
    },
    { title: "Papeterie", key: "dbba" },
    { title: "Jewelry", key: "ebba" },
    { title: "Replicas", key: "fbba" },
    { title: "Nice&Usefull", key: "gbba" },
    { title: "Sale", key: "hbba" },
];

const Header = ( { setLanguage, scrolledPastTop, screenWidth } ) => (
    <Fragment>
        {screenWidth < 850 ? (
            <HeaderDesktop
                setLanguage={ setLanguage }
                scrolledPastTop={ scrolledPastTop }
                categoryMap={ categoryMap }
            />
        ) : (
            <HeaderMobile
                setLanguage={ setLanguage }
                scrolledPastTop={ scrolledPastTop }
                categoryMap={ categoryMap }
            />
        )}
    </Fragment>
);

const mapStateToProps = state => ( {
    screenWidth: state.application.screenWidth,
} );

const mapDispatchToProps = {
    setLanguage: applicationOperations.setLanguage,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)( Header );
