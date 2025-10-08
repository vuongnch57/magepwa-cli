import React from 'react';
import { number, string } from 'prop-types';

const MinusIcon = ({ className, width, height, color }) => {
    return (
        <svg
            width={width}
            height={height}
            className={className}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M4.1665 10H15.8332"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

MinusIcon.propTypes = {
    className: string,
    width: number,
    height: number,
    color: string
};

MinusIcon.defaultProps = {
    className: '',
    width: 20,
    height: 20,
    color: '#181818'
};

export default MinusIcon;
