import { number, string } from 'prop-types';
import React from 'react';

const CheckboxCheckedRound = ({ className, width, fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={width}
      className={className}
      viewBox="0 0 20 20"
      fill="none"
    >
      <rect x="0.5" y="0.5" width="19" height="19" rx="9.5" fill={fill} />
      <rect x="0.5" y="0.5" width="19" height="19" rx="9.5" stroke={fill} />
      <path
        d="M14.6668 6.5L8.25016 12.9167L5.3335 10"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

CheckboxCheckedRound.propTypes = {
  className: string,
  width: number,
  fill: string
};

CheckboxCheckedRound.defaultProps = {
  className: '',
  width: 20,
  fill: '#181818'
};
export default CheckboxCheckedRound;
