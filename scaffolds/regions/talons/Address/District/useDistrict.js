import { useEffect, useRef } from 'react';
import { useQuery } from '@apollo/client';
import { useFieldApi, useFormApi } from 'informed';
import useFieldState from '@magento/peregrine/lib/hooks/hook-wrappers/useInformedFieldStateWrapper';
import { GET_DISTRICTS_QUERY } from './district.gql';
import { useIntl } from 'react-intl';

export const useDistrict = props => {
  const {
    regionCodeField = 'region',
    fieldSelect = 'city_id',
    optionValueKey = 'id',
  } = props;

  const { formatMessage } = useIntl();
  const hasInitialized = useRef(false);
  const formApi = useFormApi();
  const regionFieldState = useFieldState(regionCodeField);
  const { value: region } = regionFieldState;
  const districtFieldState = useFieldState(fieldSelect);
  const { value: district } = districtFieldState;
  const districtSelectFieldApi = useFieldApi(fieldSelect);

  const { data, loading } = useQuery(GET_DISTRICTS_QUERY, {
    variables: { regiondId: region },
    skip: !region
  });

  useEffect(() => {
    if (!data || !data.getDistricts) {
      return;
    }
    const selectedDistrict = data.getDistricts.find(
      item => item.id == district
    );
    if (selectedDistrict) {
      formApi.setValue('city', selectedDistrict.name);
    }
  }, [district, data, formApi]);

  useEffect(() => {
    if (region && !loading) {
      if (hasInitialized.current) {
        districtSelectFieldApi.exists() && districtSelectFieldApi.setValue();
      } else {
        hasInitialized.current = true;
      }
    }
  }, [region, districtSelectFieldApi, loading]);

  let formattedDistrictsData = [
    {
      label: formatMessage({ id: 'global.select', defaultMessage: 'Select' }),
      value: ''
    }
  ];
  if (data) {
    const { getDistricts: districts } = data;
    if (districts && districts.length > 0) {
      formattedDistrictsData = districts.map(district => ({
        key: district.id,
        label: district.name,
        value: district[optionValueKey]
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
    districts: formattedDistrictsData,
    district
  };
};
