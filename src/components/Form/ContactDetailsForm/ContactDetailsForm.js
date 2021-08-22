import { useState } from 'react';
import Button from '../../Button/Button';
import Dropdown from '../../Dropdown/Dropdown';
import Input from '../../Input/Input';
import TextArea from '../../TextArea/TextArea';
import FormCard from '../FormCard/FormCard';
import {
  emailValidation,
  textValidation,
  mobileValidation,
} from '../../../Helpers/Helpers';
import ErrorWindow from '../ErrorWindow/ErrorWindow';

const ContactDetailsForm = ({ countries, forwardFormData, formTitle }) => {
  const [formData, setFormData] = useState({
    email: '',
    address: '',
    city: '',
    country: '',
    mobile: '',
  });
  const { email, address, city, country, mobile } = formData;
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidAddress, setIsValidAddess] = useState(false);
  const [isValidCity, setIsValidCity] = useState(false);
  const [isValidMobile, setIsValidMobile] = useState(false);
  const [runReset, setRunReset] = useState(false);
  const [errors, setErrors] = useState([]);

  const addressValidation = () => {
    return textValidation(address, 30);
  };

  const resetValidation = (fieldName) => {
    switch (fieldName) {
      case 'email':
        setIsValidEmail(!emailValidation(email));

        break;

      case 'address':
        setIsValidAddess(!addressValidation());
        break;
      case 'city':
        setIsValidCity(!textValidation(city));
        break;
      case 'mobile':
        setIsValidMobile(!mobileValidation(mobile));
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

    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();

    //City validation should be done according to the selected country.
    //In general, city must be a drop down and the list of cities should be loaded upon country selection
    const _isValidEmail = emailValidation(email);
    const _isValidAddress = addressValidation();
    const _isValidCity = textValidation(city);
    const _isValidMobile = mobileValidation(mobile);

    setIsValidEmail(!_isValidEmail);
    setIsValidAddess(!_isValidAddress);
    setIsValidCity(!_isValidCity);
    setIsValidMobile(!_isValidMobile);

    if (_isValidEmail && _isValidAddress && _isValidCity && _isValidMobile) {
      forwardFormData(formData);
    } else {
      setRunReset(true);

      if (!_isValidEmail) {
        setErrors((prevErrors) => [
          ...prevErrors,
          { id: 'email', message: 'Please enter a valid email address.' },
        ]);
      }

      if (!_isValidAddress) {
        setErrors((prevErrors) => [
          ...prevErrors,
          { id: 'address', message: 'Please enter more detailed address.' },
        ]);
      }

      if (!_isValidCity) {
        setErrors((prevErrors) => [
          ...prevErrors,
          { id: 'city', message: 'Please enter a valid city.' },
        ]);
      }

      if (!_isValidMobile) {
        setErrors((prevErrors) => [
          ...prevErrors,
          { id: 'mobile', message: 'Please enter a valid mobile number.' },
        ]);
      }
    }
  };

  return (
    <FormCard cardtitle={formTitle}>
      <form onSubmit={formSubmitHandler}>
        <Input
          type='text'
          name='email'
          value={email}
          onChange={formEntryHandler}
          label='Email'
          placeholder='Please enter your email address'
          invalid={isValidEmail}
        />
        <Input
          type='text'
          value={city}
          onChange={formEntryHandler}
          label='City'
          name='city'
          placeholder='Please enter your city'
          invalid={isValidCity}
        />
        <Dropdown
          options={countries}
          name='country'
          selectTitle='Please select country'
          title='Country'
          onChange={formEntryHandler}
          value={country}
        />
        <TextArea
          name='address'
          title='Address Details'
          placeholder='Address Details'
          maxLength={300}
          showCounter
          onChange={formEntryHandler}
          value={address}
          notValid={isValidAddress}
        />
        <Input
          type='text'
          value={mobile}
          onChange={formEntryHandler}
          label='Mobile Phone'
          placeholder='Please enter your mobile phone number'
          name='mobile'
          invalid={isValidMobile}
        />
        <Button title='Continue' type='submit' />
      </form>
      <ErrorWindow errorsArr={errors} />
    </FormCard>
  );
};

export default ContactDetailsForm;
