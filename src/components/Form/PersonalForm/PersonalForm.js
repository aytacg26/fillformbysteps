import React, { useState } from 'react';
import Input from '../../Input/Input';
import Dropdown from '../../Dropdown/Dropdown';
import Button from '../../Button/Button';
import FormCard from '../FormCard/FormCard';
import { textValidation, birthdateValidation } from '../../../Helpers/Helpers';
import ErrorWindow from '../ErrorWindow/ErrorWindow';

const PersonalForm = ({ genderOptions, forwardFormData, formTitle }) => {
  const [personalFormData, setPersonalFormData] = useState({
    name: '',
    surname: '',
    birthdate: '',
    gender: '',
  });
  const { name, surname, birthdate, gender } = personalFormData;
  const [isValidName, setIsValidName] = useState(false);
  const [isValidSurname, setIsValidSurname] = useState(false);
  const [isValidBirthdate, setIsValidBirthdate] = useState(false);
  const [runReset, setRunReset] = useState(false);
  const [errors, setErrors] = useState([]);

  const resetValidation = (fieldName) => {
    switch (fieldName) {
      case 'name':
        setIsValidName(!textValidation(name));
        break;

      case 'surname':
        setIsValidSurname(!textValidation(surname));
        break;

      case 'birthdate':
        setIsValidBirthdate(false);
        break;

      default:
        break;
    }

    setErrors(errors.filter((err) => err.id !== fieldName));
  };

  const formEntryHandler = (e) => {
    const { name, value } = e.target;

    if (runReset) {
      resetValidation(name);
    }

    setPersonalFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();

    //Validation Process
    const isValidName = textValidation(name);
    const isValidSurname = textValidation(surname);
    const isValidAge = birthdateValidation(birthdate, 15);

    setIsValidName(!isValidName);
    setIsValidSurname(!isValidSurname);
    setIsValidBirthdate(!isValidAge);

    if (isValidName && isValidSurname && isValidAge) {
      forwardFormData(personalFormData);
    } else {
      setRunReset(true);

      if (!isValidName) {
        setErrors((prevErrors) => [
          ...prevErrors,
          { id: 'name', message: 'Please enter a valid name' },
        ]);
      }

      if (!isValidSurname) {
        setErrors((prevErrors) => [
          ...prevErrors,
          { id: 'surname', message: 'Please enter a valid surname' },
        ]);
      }

      if (!isValidAge) {
        setErrors((prevErrors) => [
          ...prevErrors,
          {
            id: 'birthdate',
            message:
              'Please enter a valid age. Age cannot be less than 15 and greater than 125',
          },
        ]);
      }
    }
  };

  console.log(errors);

  return (
    <FormCard cardtitle={formTitle}>
      <form onSubmit={formSubmitHandler}>
        <Input
          label='Name'
          type='text'
          placeholder={`${
            !isValidName
              ? 'Please enter your name'
              : 'Please enter a valid name'
          }`}
          name='name'
          onChange={formEntryHandler}
          value={name}
          invalid={isValidName}
        />
        <Input
          label='Surname'
          name='surname'
          type='text'
          placeholder={`${
            !isValidSurname
              ? 'Please enter your surname'
              : 'Please enter a valid surname'
          }`}
          onChange={formEntryHandler}
          value={surname}
          invalid={isValidSurname}
        />
        <Input
          label='Date of Birth'
          name='birthdate'
          type='date'
          placeholder={`${
            !isValidBirthdate
              ? 'Please enter your date of birth'
              : 'Please enter a valid birthdate (Min age 15)'
          }`}
          onChange={formEntryHandler}
          value={birthdate}
          invalid={isValidBirthdate}
        />
        <Dropdown
          options={genderOptions}
          name='gender'
          selectTitle='Please select gender'
          title='Gender'
          onChange={formEntryHandler}
          value={gender}
        />
        <Button type='submit' title='Continue' />
      </form>
      <ErrorWindow errorsArr={errors} />
    </FormCard>
  );
};

export default PersonalForm;
