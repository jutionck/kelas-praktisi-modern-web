const parseCurrency = (currencyString) => {
  if (typeof currencyString === 'number') {
    return currencyString;
  }

  if (typeof currencyString !== 'string') {
    return 0;
  }

  const numericString = currencyString
    .replace(/Rp/g, '')
    .replace(/\s+/g, '')
    .replace(/\./g, '')
    .trim();

  const number = parseFloat(numericString);
  return isNaN(number) ? 0 : number;
};

const formatCurrency = (amount) => {
  if (isNaN(amount) || amount < 0) {
    return 'Rp 0';
  }

  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const formatCurrencyWithDots = (amount) => {
  if (isNaN(amount) || amount < 0) {
    return 'Rp 0';
  }

  return 'Rp ' + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

const validateCurrency = (input) => {
  const amount = parseCurrency(input);

  if (isNaN(amount)) {
    return {
      isValid: false,
      error: 'Invalid currency format',
    };
  }

  if (amount < 0) {
    return {
      isValid: false,
      error: 'Price cannot be negative',
    };
  }

  if (amount > 999999999999) {
    return {
      isValid: false,
      error: 'Price exceeds maximum limit',
    };
  }

  return {
    isValid: true,
    amount: amount,
  };
};

module.exports = {
  parseCurrency,
  formatCurrency,
  formatCurrencyWithDots,
  validateCurrency,
};
