import 'intl';
import 'intl/locale-data/jsonp/en';

export const numberFormat = value =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(value);
