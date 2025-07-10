import { useState, useEffect } from 'react';
import {
  formatCurrencyInput,
  parseCurrency,
  validateCurrency,
} from '../utils/currency';

const CurrencyInput = ({
  value,
  onChange,
  placeholder = 'Rp 0',
  className = '',
  disabled = false,
  error = '',
  ...props
}) => {
  const [displayValue, setDisplayValue] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (value) {
      const numericValue =
        typeof value === 'string' ? parseCurrency(value) : value;
      if (numericValue > 0) {
        setDisplayValue(formatCurrencyInput(numericValue.toString()));
      } else {
        setDisplayValue('');
      }
    } else {
      setDisplayValue('');
    }
  }, [value]);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;

    if (inputValue === '') {
      setDisplayValue('');
      setIsValid(true);
      setErrorMessage('');
      onChange('');
      return;
    }

    const formatted = formatCurrencyInput(inputValue);
    setDisplayValue(formatted);

    const validation = validateCurrency(formatted);
    setIsValid(validation.isValid);
    setErrorMessage(validation.error || '');

    if (validation.isValid) {
      onChange(validation.amount);
    }
  };

  const handleBlur = () => {
    if (displayValue === '') {
      setIsValid(true);
      setErrorMessage('');
    }
  };

  const inputClassName = `
    input-field
    ${className}
    ${
      !isValid || error
        ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
        : ''
    }
    ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
  `.trim();

  return (
    <div className='w-full'>
      <input
        type='text'
        value={displayValue}
        onChange={handleInputChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        className={inputClassName}
        disabled={disabled}
        {...props}
      />
      {(errorMessage || error) && (
        <p className='mt-1 text-sm text-red-600'>{error || errorMessage}</p>
      )}
    </div>
  );
};

export default CurrencyInput;
