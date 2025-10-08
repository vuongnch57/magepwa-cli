export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export const checkSlash = path => {
  if (typeof path === 'string' && path) {
    return path.startsWith('/') ? path : '/' + path;
  }
  return path;
};

export const padTime = number => `${number}`.padStart(2, '0');

export const isValidUrl = url => {
  try {
    new URL(url);
    return true;
  } catch (err) {
    return false;
  }
};
