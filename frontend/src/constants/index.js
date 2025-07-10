export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const CATEGORIES = [
  'General',
  'Electronics',
  'Books',
  'Clothing',
  'Sports',
  'Home',
  'Other',
];

export const PRIORITIES = ['low', 'medium', 'high'];

export const PRIORITY_COLORS = {
  high: 'bg-red-100 text-red-800 border-red-200',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  low: 'bg-green-100 text-green-800 border-green-200',
};

export const PRIORITY_ICONS = {
  high: '🔴',
  medium: '🟡',
  low: '🟢',
};

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'priority', label: 'Priority' },
];

export const STATUS_FILTERS = [
  { value: 'all', label: 'All Items' },
  { value: 'pending', label: 'Pending' },
  { value: 'done', label: 'Completed' },
];

export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
};

export const DEBOUNCE_DELAY = 300;

export const CURRENCY_SYMBOL = 'Rp';
export const CURRENCY_LOCALE = 'id-ID';
export const CURRENCY_CODE = 'IDR';
