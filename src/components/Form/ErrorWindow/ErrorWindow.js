import classes from './ErrorWindow.module.scss';

const ErrorWindow = ({ errorsArr }) => {
  return (
    <div className={classes.ErrorWindow}>
      <ul>
        {errorsArr.map((err) => (
          <li key={err.id}>{err.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default ErrorWindow;
