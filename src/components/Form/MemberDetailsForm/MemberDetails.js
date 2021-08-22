import { useState } from 'react';
import FormCard from '../FormCard/FormCard';
import Input from '../../Input/Input';
import Button from '../../Button/Button';
import { passwordValidation } from '../../../Helpers/Helpers';

/**
 *     username: '',
    password: '',
 */
const MemberDetails = ({ formTitle, forwardFormData }) => {
  const [memberData, setMemberData] = useState({
    username: '',
    password: '',
    passwordConfirm: '',
  });
  const { username, password, passwordConfirm } = memberData;

  const formEntryHandler = (e) => {
    const { name, value } = e.target;

    setMemberData((prevState) => ({ ...prevState, [name]: value }));
  };

  const comparePasswordsHandler = () => {
    console.log(password);
    console.log(passwordConfirm);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();

    console.log(memberData);

    //Validation required
    //forwardFormData(memberData);
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
        />
        <Input
          label='Password'
          type='password'
          placeholder='Please enter your password'
          name='password'
          onChange={formEntryHandler}
          value={password}
          maxLength='30'
        />
        <Input
          label='Confirm Password'
          type='password'
          placeholder='Please confirm your password'
          name='passwordConfirm'
          onChange={formEntryHandler}
          value={passwordConfirm}
          onBlur={comparePasswordsHandler}
          maxLength='30'
        />
        <Button type='submit' title='Continue' />
      </form>
    </FormCard>
  );
};

export default MemberDetails;
