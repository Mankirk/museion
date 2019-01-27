import React from "react";
import PropTypes from "prop-types";
import utils from "./utils";
import MobileDot from "./mobileDot";

import "./mobileDots.scss";

class MobileDots extends React.Component {
    constructor( props ) {
        super( props );
        this.state = {
            leftBorder: 0,
            rightBorder: 5,
        };

        this.adjustDotWrapperBorders = this.adjustDotWrapperBorders.bind( this );
    }

    componentWillReceiveProps( nextProps ) {
        const adjustedBorders = this.adjustDotWrapperBorders( nextProps.currentIndex );

        this.setState( {
            leftBorder: adjustedBorders.leftBorder,
            rightBorder: adjustedBorders.rightBorder,
        } );
    }

    adjustDotWrapperBorders( newIndex ) {
        // left/right borders are the extremities of the display segment
        const { leftBorder, rightBorder } = this.state;
        const { numberOfImages } = this.props;

        const shouldShiftBordersRight =
            newIndex === rightBorder - 1 && newIndex !== 0 && newIndex !== numberOfImages - 1;
        const shouldShiftBordersLeft =
            newIndex === leftBorder && newIndex !== 0 && newIndex !== numberOfImages - 1;

        if ( shouldShiftBordersRight ) {
            return {
                leftBorder: leftBorder + 1,
                rightBorder: rightBorder + 1,
            };
        }

        if ( shouldShiftBordersLeft ) {
            return {
                leftBorder: leftBorder - 1,
                rightBorder: rightBorder - 1,
            };
        }
        // borders do not need changing
        return { leftBorder, rightBorder };
    }

    render() {
        const { numberOfImages, currentIndex, handleDotClick } = this.props;
        const { rightBorder, leftBorder } = this.state;
        const dotSize = 10;
        const mediumDotSize = 8;
        const smallDotSize = 6;
        const distanceBetweenDots = 10;

        const dots = utils
            .createRange( numberOfImages - 1 )
            .map( dotIndex => (
                <MobileDot
                    numberOfImages={ numberOfImages }
                    currentIndex={ currentIndex }
                    dotIndex={ dotIndex }
                    rightBorder={ rightBorder }
                    leftBorder={ leftBorder }
                    handleDotClick={ handleDotClick }
                    dotSize={ dotSize }
                    mediumDotSize={ mediumDotSize }
                    smallDotSize={ smallDotSize }
                    key={ dotIndex }
                />
            ) );

        const allocatedDotSpace = dotSize + distanceBetweenDots;
        const dotsToBeShown = 5;

        const shiftLeftDistance = `${ -1 * allocatedDotSpace * leftBorder }px`;

        let dotsWrapperStyle = {};

        if ( numberOfImages > 5 ) {
            dotsWrapperStyle = {
                width: `${ numberOfImages * allocatedDotSpace }px`,
                left: shiftLeftDistance,
            };
        }

        return (
            <div className="dots-section">
                <div
                    className="visibility-box"
                    style={ { width: `${ dotsToBeShown * allocatedDotSpace }px` } }
                >
                    <div className="dots-wrapper" style={ dotsWrapperStyle }>
                        {dots}
                    </div>
                </div>
            </div>
        );
    }
}

MobileDots.propTypes = {
    numberOfImages: PropTypes.number.isRequired,
    currentIndex: PropTypes.number.isRequired,
    handleDotClick: PropTypes.func.isRequired,
};

export default MobileDots;
