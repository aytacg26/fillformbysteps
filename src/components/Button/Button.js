import React from 'react';
import classes from './Button.module.scss';

const Button = ({ title, type, onClick }) => {
  return (
    <button
      type={type ? type : 'button'}
      onClick={onClick}
      className={classes.Button}
    >
      {title}
    </button>
  );
};

export default Button;
