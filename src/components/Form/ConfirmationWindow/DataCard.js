import React from 'react';
import classes from './DataCard.module.scss';

const DataCard = ({ title, value }) => {
  return (
    <div className={classes.dataCard}>
      <span className={classes.Label}>{title}</span>
      <span className={classes.Data}>{value}</span>
    </div>
  );
};

export default DataCard;
