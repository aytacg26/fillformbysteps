import React from 'react';
import Button from '../../Button/Button';
import FormCard from '../FormCard/FormCard';
import classes from './ConfirmationWindow.module.scss';
import DataCard from './DataCard';

const ConfirmationWindow = ({ formData, forwardConfirmation }) => {
  const {
    name,
    surname,
    gender,
    birthdate,
    email,
    address,
    city,
    country,
    mobile,
    username,
    password,
  } = formData;

  return (
    <FormCard cardtitle='Confirmation'>
      <div className={classes.desc}>
        <p>Please check your form data and confirm.</p>
        <small>
          You may visit each form again by clicking back button on the bottom
          left corner and revise any data you want.
        </small>
      </div>
      <FormCard cardtitle='Personal Details'>
        <div className={classes.dataCardsContainer}>
          <DataCard title='Name' value={name} />
          <DataCard title='Surname' value={surname} />
          <DataCard title='Gender' value={gender} />
          <DataCard
            title='Birth Date'
            value={new Date(birthdate).toLocaleString('en-US', {
              year: 'numeric',
              month: 'long',
              day: '2-digit',
            })}
          />
        </div>
      </FormCard>
      <FormCard cardtitle='Contact Details'>
        <div className={classes.dataCardsContainer}>
          <DataCard title='Email' value={email} />
          <DataCard title='Address' value={address} />
          <DataCard title='City' value={city} />
          <DataCard title='Country' value={country} />
          <DataCard title='Mobile Number' value={mobile} />
        </div>
      </FormCard>
      <FormCard cardtitle='Member Details'>
        <div className={classes.dataCardsContainer}>
          <DataCard title='Username' value={username} />
          <DataCard
            title='Password'
            value={`${password.substring(0, 2)}*********${password.substring(
              password.length - 1,
              password.length
            )}`}
          />
        </div>
      </FormCard>
      <Button title='Confirm' onClick={forwardConfirmation} />
    </FormCard>
  );
};

export default ConfirmationWindow;
