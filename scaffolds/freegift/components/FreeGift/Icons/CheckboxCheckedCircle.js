import React from 'react';
import { number, string } from 'prop-types';

const CheckboxCheckedCircle = ({ className, width, height }) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0.5" y="0.5" width="19" height="19" rx="9.5" fill="#181818" />
      <rect x="0.5" y="0.5" width="19" height="19" rx="9.5" stroke="#181818" />
      <path
        d="M14.6663 6.5L8.24967 12.9167L5.33301 10"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

CheckboxCheckedCircle.propTypes = {
  className: string,
  width: number,
  height: number
};

CheckboxCheckedCircle.defaultProps = {
  className: '',
  width: 20,
  height: 20
};

export default CheckboxCheckedCircle;
