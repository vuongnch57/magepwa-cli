import React from 'react';
import { number, string } from 'prop-types';

const PlusIcon = ({ className, width, height, color }) => {
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
                d="M9.99984 4.16666V15.8333M4.1665 9.99999H15.8332"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

PlusIcon.propTypes = {
    className: string,
    width: number,
    height: number,
    color: string,
};

PlusIcon.defaultProps = {
    className: '',
    width: 20,
    height: 20,
    color: '#181818'
};

export default PlusIcon;
