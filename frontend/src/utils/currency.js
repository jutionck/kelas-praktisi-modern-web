export const parseCurrency = (currencyString) => {
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
    .replace(/,/g, '')
    .trim();
  
  const number = parseFloat(numericString);
  return isNaN(number) ? 0 : number;
};

export const formatCurrency = (amount) => {
  if (isNaN(amount) || amount < 0) {
    return 'Rp 0';
  }
  
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

export const formatCurrencyWithDots = (amount) => {
  if (isNaN(amount) || amount < 0) {
    return 'Rp 0';
  }
  
  return 'Rp ' + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

export const formatCurrencyInput = (input) => {
  const numericOnly = input.replace(/\D/g, '');
  
  if (!numericOnly) {
    return '';
  }
  
  const number = parseInt(numericOnly);
  return formatCurrencyWithDots(number);
};

export const validateCurrency = (input) => {
  const amount = parseCurrency(input);
  
  if (isNaN(amount)) {
    return {
      isValid: false,
      error: 'Format mata uang tidak valid'
    };
  }
  
  if (amount < 0) {
    return {
      isValid: false,
      error: 'Harga tidak boleh negatif'
    };
  }
  
  if (amount > 999999999999) {
    return {
      isValid: false,
      error: 'Harga melebihi batas maksimum'
    };
  }
  
  return {
    isValid: true,
    amount: amount
  };
};

export const handleCurrencyChange = (value, callback) => {
  const formatted = formatCurrencyInput(value);
  callback(formatted);
};