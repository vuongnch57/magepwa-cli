/* eslint-disable no-duplicate-imports */
import React, { useRef, useState } from 'react';
import HeadingPoint from 'src/components/CheckoutPage/HeadingPoint';
import { FormattedMessage } from 'react-intl';
import { useStyle } from '@magento/venia-ui/lib/classify';
import { Form, Relevant } from 'informed';
import { useIntl } from 'react-intl';
import {
  validateNumber,
  validatePassport,
  validateVat,
  validateVatCompany,
  validateCompanyName,
  validateBranchCode
} from 'src/utils/validateForm';
import {
  isRequired,
  validateEmail,
  hasLengthAtMost
} from '@magento/venia-ui/lib/util/formValidators';
import combine from '@magento/venia-ui/lib/util/combineValidators';
import TextInput from '@magento/venia-ui/lib/components/TextInput';
import Select from '@magento/venia-ui/lib/components/Select';
import Field from '@magento/venia-ui/lib/components/Field';
import { useTaxInvoice } from 'src/talons/CheckoutPage/TaxInvoice/useTaxInvoice';

import defaultClasses from './taxInvoice.module.css';

const TaxInvoice = React.forwardRef((props, ref) => {
  const classes = useStyle(defaultClasses, props.classes);
  const { formatMessage } = useIntl();
  // eslint-disable-next-line no-unused-vars
  const [typeCompanyTax, setTypeCompanyTax] = useState(false);
  const formApiRef = useRef();
  const { handleSubmit, isShowTaxBilling } = useTaxInvoice();

  const taxRequestOptions = [
    {
      label: formatMessage({
        id: 'TaxRequest.pleaseSelectYourTaxType',
        defaultMessage: 'Please select your Tax type'
      }),
      value: ''
    },
    {
      label: formatMessage({
        id: 'TaxRequest.thaiTaxInvoice',
        defaultMessage: 'Thai Tax Invoice'
      }),
      value: 'thai_national'
    },
    {
      label: formatMessage({
        id: 'TaxRequest.nonThaiTaxInvoice',
        defaultMessage: 'Non Thai Tax Invoice'
      }),
      value: 'a_non_thai_national'
    },
    {
      label: formatMessage({
        id: 'TaxRequest.companyTaxInvoice',
        defaultMessage: 'Company Tax Invoice'
      }),
      value: 'juristic_person'
    }
  ];

  const handleChange = event => {
    const { value } = event.target;
    if (value === 'juristic_person') {
      setTypeCompanyTax(true);
    } else {
      setTypeCompanyTax(false);
    }
  };

  React.useImperativeHandle(ref, () => ({
    submitInvoice: async () => {
      if (!isShowTaxBilling) {
        return await handleSubmit({}, false);
      }
      const formApi = formApiRef.current;
      await formApi.validate();
      const { errors, values } = formApi.getState();
      const hasError = Object.keys(errors).length > 0;
      if (hasError) {
        return false;
      } else {
        return await handleSubmit(values);
      }
    }
  }));

  return (
    <div className={classes.root} data-cy="TaxInvoice-root">
      <HeadingPoint
        title={
          <FormattedMessage
            id={'taxInvoice.confirmTaxInvoice'}
            defaultMessage={'Confirm Tax Invoice information'}
          />
        }
        titleClassName={classes.title}
      />
      <div className={classes.message}>
        <FormattedMessage
          id={'taxInvoice.message'}
          defaultMessage={
            'Document cannot edit after issue. We will send via email, for member you can print it later in My Account.'
          }
        />
      </div>
      <Form
        className={classes.form}
        onSubmit={handleSubmit}
        getApi={api => {
          formApiRef.current = api;
        }}
      >
        <Field
          className={classes.field}
          label={formatMessage({
            id: 'taxInvoice.taxInvoiceType',
            defaultMessage: 'Tax Invoice Type'
          })}
          isRequired
        >
          <Select
            field="type_tax_invoice"
            items={taxRequestOptions}
            validate={isRequired}
            onChange={handleChange}
            validateOnChange
            validateOnBlur
          />
        </Field>
        <Relevant
          when={({ values }) => values?.type_tax_invoice === 'thai_national'}
        >
          <Field
            className={classes.field}
            label={formatMessage({
              id: 'taxInvoice.IdentifierNumber',
              defaultMessage: 'Identifier Number'
            })}
            isRequired
          >
            <TextInput
              type="text"
              field="identification_number"
              validate={combine([isRequired, validateNumber, validateVat])}
              validateOnChange
              validateOnBlur
            />
          </Field>
        </Relevant>
        <Relevant
          when={({ values }) =>
            values?.type_tax_invoice === 'a_non_thai_national'
          }
        >
          <Field
            className={classes.field}
            label={formatMessage({
              id: 'taxInvoice.passportNumber',
              defaultMessage: 'Passport Number'
            })}
            isRequired
          >
            <TextInput
              type="text"
              field="passport_number"
              validate={combine([
                isRequired,
                validatePassport,
                [hasLengthAtMost, 10]
              ])}
              validateOnChange
              validateOnBlur
            />
          </Field>
        </Relevant>
        <Relevant
          when={({ values }) => values?.type_tax_invoice === 'juristic_person'}
        >
          <Field
            className={classes.field}
            label={formatMessage({
              id: 'taxInvoice.companyName',
              defaultMessage: 'Company Name'
            })}
            isRequired
          >
            <TextInput
              type="text"
              field="juristic_name"
              validate={combine([isRequired, validateCompanyName])}
              validateOnChange
              validateOnBlur
            />
          </Field>
          <Field
            className={classes.field}
            label={formatMessage({
              id: 'taxInvoice.companyTaxNumber',
              defaultMessage: 'Company Tax Number'
            })}
            isRequired
          >
            <TextInput
              type="text"
              field="tax_number"
              validate={combine([
                isRequired,
                validateNumber,
                validateVatCompany
              ])}
              validateOnChange
              validateOnBlur
            />
          </Field>
          <Field
            className={classes.field}
            label={formatMessage({
              id: 'taxInvoice.branchCode',
              defaultMessage: 'Branch Code'
            })}
            isRequired
          >
            <TextInput
              type="text"
              field="branch_code"
              validate={combine([
                isRequired,
                validateNumber,
                validateBranchCode
              ])}
              validateOnChange
              validateOnBlur
              placeHolder={formatMessage({
                id: 'taxInvoice.branchCodePlaceholder',
                defaultMessage: '0 = Head Office or Input Branch code'
              })}
            />
          </Field>
        </Relevant>
        <Field
          className={classes.colSpanField}
          label={formatMessage({
            id: 'taxInvoice.email',
            defaultMessage: 'Email'
          })}
          isRequired
        >
          <TextInput
            type="text"
            field="billing_email"
            validate={combine([isRequired, validateEmail])}
            validateOnChange
            validateOnBlur
          />
        </Field>
      </Form>
    </div>
  );
});

export default TaxInvoice;
