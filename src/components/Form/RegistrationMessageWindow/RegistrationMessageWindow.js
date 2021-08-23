import React, { Fragment } from 'react';
import AnimatedMark from '../AnimatedMark/AnimatedMark';
import classes from './RegistrationMessageWindow.module.scss';

const RegistrationMessageWindow = ({ statusCode }) => {
  const isSuccess = statusCode === 200;

  return (
    <div
      className={classes.MsgContainer}
      style={{ color: isSuccess ? 'rgb(172, 255, 47)' : '#e50914' }}
    >
      <header>
        <div>
          {isSuccess ? 'Registered Successfully' : 'Unexpected Server Error'}
        </div>
      </header>
      <div className={classes.AnimationSection}>
        <AnimatedMark isSuccess={isSuccess} />
      </div>
      {isSuccess ? (
        <div className={classes.FooterMsg}>
          <p>Your registration completed successfully.</p>
          <p>
            Please check your email address and confirm your email to complete
            registration
          </p>
        </div>
      ) : (
        <div className={classes.FooterMsg}>
          <p>
            We are sorry, because of unexpected server error, we couldn't save
            your data.
          </p>
          <p>Please try again later.</p>
          <small>
            Please click back button on bottom left corner and try again
          </small>
        </div>
      )}
    </div>
  );
};

export default RegistrationMessageWindow;
