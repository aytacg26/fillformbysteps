import React from 'react';
import CheckIcon from '@material-ui/icons/Check';
import classes from './Circle.module.scss';

const Circle = ({ value, title, completed }) => {
  const circleClass = `${classes.formCircle} ${
    completed ? classes.completed : ''
  }`;

  const val = completed ? <CheckIcon /> : value;

  return (
    <div className={classes.CircleContainer}>
      <span className={circleClass}>{val}</span>
      <span className={classes.Title}>{title}</span>
    </div>
  );
};

export default Circle;
