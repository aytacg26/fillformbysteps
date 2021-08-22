import { Fragment } from 'react';
import classes from './Dropdown.module.scss';

const Dropdown = ({ options, onChange, selectTitle, title, name, value }) => {
  const optionList = options ? options : [];

  if (optionList.length === 0) {
    return <Fragment></Fragment>;
  }

  return (
    <div className={classes.dropContainer}>
      <label className={classes.DropLabel}>{title}</label>
      <select
        onChange={onChange}
        className={classes.Dropdown}
        name={name}
        defaultValue={value}
      >
        <option value=''>{selectTitle}</option>
        {optionList.map((opt) => (
          <option value={opt.value} key={opt.title}>
            {opt.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
