import classes from './FormCard.module.scss';

const FormCard = ({ cardtitle, children }) => {
  return (
    <div className={classes.FormCard}>
      {cardtitle && <label className={classes.CardLabel}>{cardtitle}</label>}
      {children}
    </div>
  );
};

export default FormCard;
