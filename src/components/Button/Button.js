import React from 'react';
import classes from './Button.module.scss';

const Button = ({ title, type, onClick, className }) => {
  const btnClass = className ? className : classes.Button;

  return (
    <button
      type={type ? type : 'button'}
      onClick={onClick}
      className={btnClass}
    >
      {title}
    </button>
  );
};

export default Button;
