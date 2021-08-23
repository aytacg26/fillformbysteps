import React from 'react';
import classes from './AnimatedMark.module.scss';

//Animated Check Mark & Cross
//CodePen :https://codepen.io/elevaunt/pen/VvKdVa
//Thanks to Lee Porter
const AnimatedMark = ({ isSuccess }) => {
  const mark = isSuccess ? (
    <div className={classes.AnimatedMark}>
      <svg
        version='1.1'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 130.2 130.2'
      >
        <circle
          className={`${classes.path} ${classes.circle}`}
          fill='none'
          stroke='rgb(172, 255, 47)'
          strokeWidth='6'
          strokeMiterlimit='10'
          cx='65.1'
          cy='65.1'
          r='62.1'
        />
        <polyline
          className={`${classes.path} ${classes.check}`}
          fill='none'
          stroke='rgb(172, 255, 47)'
          strokeWidth='6'
          strokeLinecap='round'
          strokeMiterlimit='10'
          points='100.2,40.2 51.5,88.8 29.8,67.5 '
        />
      </svg>
    </div>
  ) : (
    <div className={classes.AnimatedMark}>
      <svg
        version='1.1'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 130.2 130.2'
      >
        <circle
          className={`${classes.path} ${classes.circle}`}
          fill='none'
          stroke='#e50914'
          strokeWidth='6'
          strokeMiterlimit='10'
          cx='65.1'
          cy='65.1'
          r='62.1'
        />
        <line
          className={`${classes.path} ${classes.line}`}
          fill='none'
          stroke='#e50914'
          strokeWidth='6'
          strokeLinecap='round'
          strokeMiterlimit='10'
          x1='34.4'
          y1='37.9'
          x2='95.8'
          y2='92.3'
        />
        <line
          className={`${classes.path} ${classes.line}`}
          fill='none'
          stroke='#e50914'
          strokeWidth='6'
          strokeLinecap='round'
          strokeMiterlimit='10'
          x1='95.8'
          y1='38'
          x2='34.4'
          y2='92.2'
        />
      </svg>
    </div>
  );

  return mark;
};

export default AnimatedMark;
