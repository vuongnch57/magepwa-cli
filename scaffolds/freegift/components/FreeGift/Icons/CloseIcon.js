import React from 'react';
import { number, string } from 'prop-types';

const CloseIcon = ({ className, width, height, color }) => {
    return (
        <svg
            width={width}
            height={height}
            className={className}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M18 6L6 18M6 6L18 18"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

CloseIcon.propTypes = {
    className: string,
    width: number,
    height: number,
    stroke: string
};

CloseIcon.defaultProps = {
    className: '',
    width: 24,
    height: 24,
    color: "#181818"
};

export default CloseIcon;
