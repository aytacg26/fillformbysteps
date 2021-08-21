import classes from './Input.module.scss';

const Input = (props) => {
  const properties = { ...props };
  const label = properties.label;
  const invalid = properties.invalid;
  delete properties.label;
  delete properties.invalid;

  return (
    <div
      className={`${classes.inputContainer} ${invalid ? classes.invalid : ''}`}
    >
      <label className={classes.InputLabel}>{label}</label>
      <input
        type={properties.type ? properties.type : 'text'}
        {...properties}
      />
    </div>
  );
};

export default Input;
