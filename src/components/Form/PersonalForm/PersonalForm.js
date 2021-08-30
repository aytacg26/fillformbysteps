import React, { useReducer } from 'react';
import Input from '../../Input/Input';
import Dropdown from '../../Dropdown/Dropdown';
import Button from '../../Button/Button';
import FormCard from '../FormCard/FormCard';
import { textValidation, birthdateValidation } from '../../../Helpers/Helpers';
import ErrorWindow from '../ErrorWindow/ErrorWindow';

const personalFormReducer = (state, action) => {
  const { type, payload } = action;

  const validation = (key, value, state) => {
    switch (key) {
      case 'name':
        return { ...state, name: !textValidation(value) };

      case 'surname':
        return {
          ...state,
          surname: !textValidation(value),
        };

      case 'birthdate':
        return { ...state, birthdate: !birthdateValidation(value, 15) };

      default:
        return state;
    }
  };

  switch (type) {
    case 'FORM_ENTRY':
      const isvalid = state.isValid;
      const key = Object.keys(payload)[0];
      const val = Object.values(payload)[0];

      return { ...state, ...payload, isValid: validation(key, val, isvalid) };

    case 'VALIDATE_NAME':
      return {
        ...state,
        isValid: validation('name', state.name, state.isValid),
      };

    case 'VALIDATE_SURNAME':
      return {
        ...state,
        isValid: validation('surname', state.surname, state.isValid),
      };

    case 'VALIDATE_BIRTHDATE':
      return {
        ...state,
        isValid: validation('birthdate', state.birthdate, state.isValid),
      };

    case 'VALIDATION':
      return {
        ...state,
        isValid: {
          name: payload.name,
          surname: payload.surname,
          birthdate: payload.birthdate,
        },
      };

    case 'ERROR':
      return { ...state, errors: [...state.errors, payload] };

    case 'REMOVE_ERROR':
      return { ...state, errors: payload };

    case 'RESET':
      return { ...state, runReset: payload };

    default:
      return state;
  }
};

const PersonalForm = ({
  genderOptions,
  forwardFormData,
  formTitle,
  savedData,
}) => {
  const [state, dispatch] = useReducer(personalFormReducer, {
    name: savedData.name ? savedData.name : '',
    surname: savedData.surname ? savedData.surname : '',
    birthdate: savedData.birthdate ? savedData.birthdate : '',
    gender: savedData.gender ? savedData.gender : '',
    isValid: { name: false, surname: false, birthdate: false },
    errors: [],
    runReset: false,
  });

  const personalFormData = {
    name: state.name,
    surname: state.surname,
    birthdate: state.birthdate,
    gender: state.gender,
  };

  const fieldValidation = (fieldName) => {
    switch (fieldName) {
      case 'name':
        dispatch({ type: 'VALIDATE_NAME' });
        break;

      case 'surname':
        dispatch({ type: 'VALIDATE_SURNAME' });
        break;

      case 'birthdate':
        dispatch({ type: 'VALIDATE_BIRTHDATE' });
        break;

      default:
        break;
    }

    dispatch({
      type: 'REMOVE_ERROR',
      payload: state.errors.filter((err) => err.id !== fieldName),
    });
    // setErrors(errors.filter((err) => err.id !== fieldName));
  };

  const formEntryHandler = (e) => {
    const { name, value } = e.target;

    if (state.runReset) {
      fieldValidation(name);
    }

    dispatch({ type: 'FORM_ENTRY', payload: { [name]: value } });
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();

    //Validation Process
    const isValidName = textValidation(state.name);
    const isValidSurname = textValidation(state.surname);
    const isValidAge = birthdateValidation(state.birthdate, 15);

    dispatch({
      type: 'VALIDATION',
      payload: {
        name: !isValidName,
        surname: !isValidSurname,
        birthdate: !isValidAge,
      },
    });

    if (isValidName && isValidSurname && isValidAge) {
      forwardFormData(personalFormData);
    } else {
      dispatch({ type: 'RESET', payload: true });

      if (!isValidName) {
        dispatch({
          type: 'ERROR',
          payload: { id: 'name', message: 'Please enter a valid name' },
        });
      }

      if (!isValidSurname) {
        dispatch({
          type: 'ERROR',
          payload: { id: 'surname', message: 'Please enter a valid surname' },
        });
      }

      if (!isValidAge) {
        dispatch({
          type: 'ERROR',
          payload: {
            id: 'birthdate',
            message:
              'Please enter a valid age. Age cannot be less than 15 and greater than 125',
          },
        });
      }
    }
  };

  const inputBlurHandler = (e) => {
    fieldValidation(e.target.name);
    switch (e.target.name) {
      case 'name':
        if (!textValidation(e.target.value)) {
          dispatch({
            type: 'ERROR',
            payload: { id: 'name', message: 'Please enter a valid name' },
          });
        }
        break;
      case 'surname':
        if (!textValidation(e.target.value)) {
          dispatch({
            type: 'ERROR',
            payload: { id: 'surname', message: 'Please enter a valid surname' },
          });
        }
        break;
      case 'birthdate':
        if (!birthdateValidation(e.target.value, 15)) {
          dispatch({
            type: 'ERROR',
            payload: {
              id: 'birthdate',
              message:
                'Please enter a valid age. Age cannot be less than 15 and greater than 125',
            },
          });
        }
        break;
      default:
        break;
    }
  };

  return (
    <FormCard cardtitle={formTitle}>
      <form onSubmit={formSubmitHandler}>
        <Input
          label='Name'
          type='text'
          placeholder={`${
            !state.isValid.name
              ? 'Please enter your name'
              : 'Please enter a valid name'
          }`}
          name='name'
          onChange={formEntryHandler}
          onBlur={inputBlurHandler}
          value={state.name}
          invalid={state.isValid.name}
        />
        <Input
          label='Surname'
          name='surname'
          type='text'
          placeholder={`${
            !state.isValid.surname
              ? 'Please enter your surname'
              : 'Please enter a valid surname'
          }`}
          onChange={formEntryHandler}
          onBlur={inputBlurHandler}
          value={state.surname}
          invalid={state.isValid.surname}
        />
        <Input
          label='Date of Birth'
          name='birthdate'
          type='date'
          placeholder={`${
            !state.isValid.birthdate
              ? 'Please enter your date of birth'
              : 'Please enter a valid birthdate (Min age 15)'
          }`}
          onChange={formEntryHandler}
          onBlur={inputBlurHandler}
          value={state.birthdate}
          invalid={state.isValid.birthdate}
        />
        <Dropdown
          options={genderOptions}
          name='gender'
          selectTitle='Please select gender'
          title='Gender'
          onChange={formEntryHandler}
          value={state.gender}
        />
        <Button type='submit' title='Continue' />
      </form>
      <ErrorWindow errorsArr={state.errors} />
    </FormCard>
  );
};

export default PersonalForm;
