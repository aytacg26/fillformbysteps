import { useState } from 'react';
import FormCard from '../FormCard/FormCard';
import Input from '../../Input/Input';
import Button from '../../Button/Button';
import {
  passwordValidation,
  comparePasswords,
  textValidation,
} from '../../../Helpers/Helpers';
import ErrorWindow from '../ErrorWindow/ErrorWindow';

/**
 *     username: '',
    password: '',
 */
const MemberDetails = ({ formTitle, forwardFormData, savedData }) => {
  const [memberData, setMemberData] = useState({
    username: savedData.username ? savedData.username : '',
    password: savedData.password ? savedData.password : '',
    passwordConfirm: savedData.password ? savedData.password : '',
  });
  const { username, password, passwordConfirm } = memberData;
  const [errors, setErrors] = useState([]);
  const [isValidUsername, setIsValidUsername] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [arePasswordsMatch, setArePasswordsMatch] = useState(true);
  const [runReset, setRunReset] = useState(false);
  const passwordRules = {
    minLength: 8,
    maxLength: 20,
    minLowerCase: 2,
    minUpperCase: 2,
  };

  const passwordCompareHandler = () => {
    const passCompareResult = comparePasswords(password, passwordConfirm);

    if (!passCompareResult) {
      setArePasswordsMatch(false);
      setRunReset(true);
      setErrors((prevErrors) => [
        ...prevErrors,
        {
          id: 'passwordConfirm',
          message: 'Password and Confirm Password does not match!',
        },
      ]);
    } else {
      //This part should be revised, this is not the best solution for the password match
      setArePasswordsMatch(true);
    }
  };

  const resetValidation = (fieldName) => {
    switch (fieldName) {
      case 'username':
        setIsValidUsername(false);
        break;
      case 'password':
        setIsValidPassword(false);
        break;
      case 'passwordConfirm':
        setArePasswordsMatch(comparePasswords(password, passwordConfirm));
        break;
      default:
        break;
    }
    setErrors(errors.filter((error) => error.id !== fieldName));
  };

  const formEntryHandler = (e) => {
    const { name, value } = e.target;

    if (runReset) {
      resetValidation(name);
    }

    setMemberData((prevState) => ({ ...prevState, [name]: value }));
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    //Existance of Username must be checked from database too.
    const _isValidUsername = textValidation(username, 4);
    const _isValidPassword = passwordValidation(
      password,
      passwordRules.minLength,
      passwordRules.maxLength,
      passwordRules.maxLowerCase,
      passwordRules.minUpperCase,
      0
    );
    const _doesPasswordsMatch = comparePasswords(password, passwordConfirm);

    setIsValidUsername(!_isValidUsername);
    setIsValidPassword(!_isValidPassword);

    if (_isValidUsername && _isValidPassword && _doesPasswordsMatch) {
      forwardFormData(memberData);
    } else {
      setRunReset(true);

      if (!_isValidUsername) {
        if (username.trim().length === 0) {
          setErrors((prevErrors) => [
            ...prevErrors,
            {
              id: 'username',
              message:
                'Username cannot be empty. Please enter a valid username. (minimum 5 characters)',
            },
          ]);
        } else {
          setErrors((prevErrors) => [
            ...prevErrors,
            {
              id: 'username',
              message:
                'Username must have at least 5 characters. Please choose another username',
            },
          ]);
        }
      }

      if (!_isValidPassword) {
        if (password.length > 20) {
          setErrors((prevErrors) => [
            ...prevErrors,
            {
              id: 'password',
              message:
                'Maximum acceptable length for password is 20 characters. Please revise your password.',
            },
          ]);
        } else {
          setErrors((prevErrors) => [
            ...prevErrors,
            {
              id: 'password',
              message:
                'Please enter a valid password. Min length of password must be 8 characters, password must contain at least 2 lowercase and 2 uppercase characters',
            },
          ]);
        }
      }

      if (!_doesPasswordsMatch) {
        const existingMatchError = errors.filter(
          (error) => error.id === 'passwordConfirm'
        );

        if (existingMatchError.length === 0) {
          setErrors((prevErrors) => [
            ...prevErrors,
            {
              id: 'passwordConfirm',
              message:
                'Password does not match with confirm password. Please re-enter your password or confirm password.',
            },
          ]);
        }
      }
    }
  };

  return (
    <FormCard cardtitle={formTitle}>
      <form onSubmit={formSubmitHandler}>
        <Input
          label='Username'
          type='text'
          placeholder='Please enter your username'
          name='username'
          onChange={formEntryHandler}
          value={username}
          maxLength='20'
          invalid={isValidUsername}
        />
        <Input
          label='Password'
          type='password'
          placeholder='Please enter your password'
          name='password'
          onChange={formEntryHandler}
          value={password}
          maxLength='30'
          invalid={isValidPassword || !arePasswordsMatch}
        />
        <Input
          label='Confirm Password'
          type='password'
          placeholder='Please confirm your password'
          name='passwordConfirm'
          onChange={formEntryHandler}
          onBlur={passwordCompareHandler}
          value={passwordConfirm}
          maxLength='30'
          invalid={isValidPassword || !arePasswordsMatch}
        />
        <Button type='submit' title='Continue' />
      </form>
      <ErrorWindow errorsArr={errors} />
    </FormCard>
  );
};

export default MemberDetails;
