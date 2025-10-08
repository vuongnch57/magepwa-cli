import { useEffect, useRef } from 'react';
import { useQuery } from '@apollo/client';
import { useFieldApi, useFormApi } from 'informed';
import useFieldState from '@magento/peregrine/lib/hooks/hook-wrappers/useInformedFieldStateWrapper';
import { GET_SUB_DISTRICTS_QUERY } from './subDistrict.gql';
import { useIntl } from 'react-intl';

export const useSubDistrict = props => {
  const {
    districtCodeField = 'city_id',
    postCodeField = 'postcode',
    fieldSelect = 'sub_district_id',
    optionValueKey = 'id'
  } = props;

  const { formatMessage } = useIntl();
  const hasInitialized = useRef(false);
  const formApi = useFormApi();
  const districtFieldState = useFieldState(districtCodeField);
  const { value: district } = districtFieldState;
  const subDistrictFieldState = useFieldState(fieldSelect);
  const { value: subDistrict } = subDistrictFieldState;

  const subDistrictSelectFieldApi = useFieldApi(fieldSelect);
  const postcodeFieldApi = useFieldApi(postCodeField);

  const { data, loading } = useQuery(GET_SUB_DISTRICTS_QUERY, {
    variables: { districtId: district },
    skip: !district
  });

  useEffect(() => {
    if (!data || !data.getSubDistricts) {
      return;
    }
    const selectedSubDistrict = data.getSubDistricts.find(
      item => item.id == subDistrict
    );
    if (selectedSubDistrict) {
      formApi.setValue('sub_district', selectedSubDistrict.name);
      postcodeFieldApi.setValue(selectedSubDistrict.postcode);
    }
  }, [subDistrict, data, postcodeFieldApi, formApi]);

  useEffect(() => {
    if (district && !loading) {
      if (hasInitialized.current) {
        subDistrictSelectFieldApi.exists() &&
          subDistrictSelectFieldApi.setValue() &&
          postcodeFieldApi.setValue();
      } else {
        hasInitialized.current = true;
      }
    }
  }, [district, subDistrictSelectFieldApi, postcodeFieldApi, loading]);

  let formattedDistrictsData = [
    {
      label: formatMessage({ id: 'global.select', defaultMessage: 'Select' }),
      value: ''
    }
  ];
  if (data) {
    const { getSubDistricts: subDistricts } = data;
    if (subDistricts && subDistricts.length > 0) {
      formattedDistrictsData = subDistricts.map(subDistrict => ({
        key: subDistrict.id,
        label: subDistrict.name,
        value: subDistrict[optionValueKey]
      }));
      formattedDistrictsData.unshift({
        disabled: true,
        hidden: true,
        label: formatMessage({ id: 'global.select', defaultMessage: 'Select' }),
        value: ''
      });
    } else {
      formattedDistrictsData = [];
    }
  }

  return {
    loading,
    subDistricts: formattedDistrictsData,
    subDistrict
  };
};
