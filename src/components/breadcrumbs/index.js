import React from "react";

import "./breadcrumbs.scss";

const Breadcrumbs = ( /* { links } */ ) => (
    <div className="breadcrumbs">
        <span className="crumb">
            <span>One</span>
        </span>
        <span className="crumb">
            <span className="arrows">>></span>
            <span>Two</span>
        </span>
        <span className="crumb">
            <span className="arrows">>></span>
            <span>Three</span>
        </span>
    </div>
);

export default Breadcrumbs;
