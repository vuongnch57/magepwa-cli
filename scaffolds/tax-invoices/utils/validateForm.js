export const validateByRegex = ({ regex, id, defaultMessage }) => value => {
  const message = {
    id,
    defaultMessage
  };
  if (!regex.test(value)) {
    return message;
  }
  return undefined;
};

export const validateNumber = validateByRegex({
  regex: /^[0-9]*$/,
  id: 'validation.acceptNumberOnly',
  defaultMessage: 'Must be numbers'
});

export const validatePassport = validateByRegex({
  regex: /^[0-9a-zA-Z]*$/,
  id: 'validation.acceptNumberAlphabetOnly',
  defaultMessage: 'Must be numbers or alphabet characters'
});

export const validateEmail = validateByRegex({
  regex: /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/,
  id: 'validation.validateEmailFormat',
  defaultMessage:
    'Invalid input {value}. Please enter a valid email address (Ex: johndoe@domain.com).'
});

export const validateVat = value => {
  const message = {
    id: 'validation.vatNotValid',
    defaultMessage: 'Identification number is not valid'
  };
  if (!value) return message;
  const fixedLength = 13;
  const lastIndex = fixedLength - 1;
  if (value.length !== fixedLength) return message;
  let sum = 0;
  for (let i = 0; i < lastIndex; i++) {
    sum += parseFloat(value.charAt(i)) * (fixedLength - i);
  }
  if ((11 - (sum % 11)) % 10 !== parseFloat(value.charAt(lastIndex))) {
    return message;
  }
  return undefined;
};

export const validateVatCompany = value => {
  const message = {
    id: 'validation.vatNotValid',
    defaultMessage: 'Company tax number is not valid'
  };
  if (!value) return message;
  if (value.length != 13) return message;
  return undefined;
};

export const validateBranchCode = value => {
  const message = {
    id: 'validation.branchNotValid',
    defaultMessage: 'Branch code is not valid'
  };
  if (!value) return message;
  if (value.length > 5 || value.length < 5) return message;
  return undefined;
};

export const validateCompanyName = value => {
  const message = {
    id: 'validation.companyNameNotValid',
    defaultMessage: 'Company Name is not valid'
  };
  if (!value) return message;
  if (value.length > 100) return message;
  return undefined;
};

export const validateJuristicName = value => {
  const message = {
    id: 'validation.juristicNameNotValid',
    defaultMessage: 'Juristic name should have both first and last name'
  };
  if (!value) return message;
  const isValid = /^[w \\u0000-\\u007F\\u0E00-\\u0E7F]+\\s+[w \\u0000-\\u007F\\u0E00-\\u0E7F]+/i.test(
    value
  );
  return isValid ? undefined : message;
};
