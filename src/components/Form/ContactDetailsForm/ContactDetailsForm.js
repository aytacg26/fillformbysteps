import { useReducer } from 'react';
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

const contactFormReducer = (state, action) => {
  const { type, payload } = action;

  const validation = (key, value, state) => {
    switch (key) {
      case 'email':
        return { ...state, email: !emailValidation(value) };

      case 'city':
        return {
          ...state,
          city: !textValidation(value),
        };

      case 'address':
        return { ...state, address: !textValidation(value, 30) };

      case 'mobile':
        return { ...state, mobile: !mobileValidation(value) };

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

    case 'VALIDATE_EMAIL':
      return {
        ...state,
        isValid: validation('email', state.email, state.isValid),
      };
    case 'VALIDATE_ADDRESS':
      return {
        ...state,
        isValid: validation('address', state.address, state.isValid),
      };
    case 'VALIDATE_CITY':
      return {
        ...state,
        isValid: validation('city', state.city, state.isValid),
      };
    case 'VALIDATE_MOBILE':
      return {
        ...state,
        isValid: validation('mobile', state.mobile, state.isValid),
      };

    case 'VALIDATION':
      return {
        ...state,
        isValid: payload,
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

const ContactDetailsForm = ({
  countries,
  forwardFormData,
  formTitle,
  savedData,
}) => {
  const [state, dispatch] = useReducer(contactFormReducer, {
    email: savedData.email ? savedData.email : '',
    address: savedData.address ? savedData.address : '',
    city: savedData.city ? savedData.city : '',
    country: savedData.country ? savedData.country : '',
    mobile: savedData.mobile ? savedData.mobile : '',
    isValid: { email: false, address: false, city: false, mobile: false },
    runReset: false,
    errors: [],
  });

  const formData = {
    email: state.email,
    address: state.address,
    city: state.city,
    country: state.country,
    mobile: state.mobile,
  };

  const addressValidation = () => {
    return textValidation(state.address, 30);
  };

  const resetValidation = (fieldName) => {
    switch (fieldName) {
      case 'email':
        dispatch({ type: 'VALIDATE_EMAIL' });
        break;

      case 'address':
        dispatch({ type: 'VALIDATE_ADDRESS' });
        break;
      case 'city':
        dispatch({ type: 'VALIDATE_CITY' });
        break;
      case 'mobile':
        dispatch({ type: 'VALIDATE_MOBILE' });
        break;
      default:
        break;
    }

    dispatch({
      type: 'REMOVE_ERROR',
      payload: state.errors.filter((err) => err.id !== fieldName),
    });
  };

  const formEntryHandler = (e) => {
    const { name, value } = e.target;

    if (state.runReset) {
      resetValidation(name);
    }

    dispatch({ type: 'FORM_ENTRY', payload: { [name]: value } });
    //setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();

    //City validation should be done according to the selected country.
    //In general, city must be a drop down and the list of cities should be loaded upon country selection
    const _isValidEmail = emailValidation(state.email);
    const _isValidAddress = addressValidation();
    const _isValidCity = textValidation(state.city);
    const _isValidMobile = mobileValidation(state.mobile);

    dispatch({
      type: 'VALIDATION',
      payload: {
        email: !_isValidEmail,
        address: !_isValidAddress,
        city: !_isValidCity,
        mobile: !_isValidMobile,
      },
    });

    if (_isValidEmail && _isValidAddress && _isValidCity && _isValidMobile) {
      forwardFormData(formData);
    } else {
      dispatch({ type: 'RESET', payload: true });

      if (!_isValidEmail) {
        dispatch({
          type: 'ERROR',
          payload: {
            id: 'email',
            message: 'Please enter a valid email address.',
          },
        });
      }

      if (!_isValidAddress) {
        dispatch({
          type: 'ERROR',
          payload: {
            id: 'address',
            message: 'Please enter more detailed address.',
          },
        });
      }

      if (!_isValidCity) {
        dispatch({
          type: 'ERROR',
          payload: { id: 'city', message: 'Please enter a valid city.' },
        });
      }

      if (!_isValidMobile) {
        dispatch({
          type: 'ERROR',
          payload: {
            id: 'mobile',
            message: 'Please enter a valid mobile number.',
          },
        });
      }
    }
  };

  return (
    <FormCard cardtitle={formTitle}>
      <form onSubmit={formSubmitHandler}>
        <Input
          type='text'
          name='email'
          value={state.email}
          onChange={formEntryHandler}
          label='Email'
          placeholder='Please enter your email address'
          invalid={state.isValid.email}
        />
        <Input
          type='text'
          value={state.city}
          onChange={formEntryHandler}
          label='City'
          name='city'
          placeholder='Please enter your city'
          invalid={state.isValid.city}
        />
        <Dropdown
          options={countries}
          name='country'
          selectTitle='Please select country'
          title='Country'
          onChange={formEntryHandler}
          value={state.country}
        />
        <TextArea
          name='address'
          title='Address Details'
          placeholder='Address Details'
          maxLength={300}
          showCounter
          onChange={formEntryHandler}
          value={state.address}
          notValid={state.isValid.address}
        />
        <Input
          type='text'
          value={state.mobile}
          onChange={formEntryHandler}
          label='Mobile Phone'
          placeholder='Please enter your mobile phone number'
          name='mobile'
          invalid={state.isValid.mobile}
        />
        <Button title='Continue' type='submit' />
      </form>
      <ErrorWindow errorsArr={state.errors} />
    </FormCard>
  );
};

export default ContactDetailsForm;
