import React from "react";
import { Dictionary } from "../../helpers";

import "./footer.scss";

const Footer = () => (
    <div className="footer">
        <div className="footer-container">
            <div className="col-left">
                <img src="images/footerLogo.png" alt="" />
                <p className="footer-testimonial">
                    {Dictionary[ window.userLang ].footer.testimonial}
                </p>
            </div>
            <div className="col-right">
                <h4 className="links-title">{Dictionary[ window.userLang ].more}...</h4>
                <ul className="links">
                    {/* <li className="link">
                        <a href="#">Contact</a>
                    </li>
                    <li className="link">
                        <a href="#">Contact</a>
                    </li>
                    <li className="link">
                        <a href="#">Contact</a>
                    </li>
                    <li className="link">
                        <a href="#">Contact</a>
                    </li>
                    <li className="link">
                        <a href="#">Contact</a>
                    </li>
                    <li className="link">
                        <a href="#">Contact</a>
                    </li> */}
                </ul>
            </div>

            <div className="cr-stripe">Copyright {Date.now() /* .getYear() */}</div>
        </div>
    </div>
);

export default Footer;
