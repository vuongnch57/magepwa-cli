import React, { useMemo } from 'react';
import { useIntl } from 'react-intl';
import { func, number, oneOfType, shape, string } from 'prop-types';
import { useSubDistrict } from 'src/talons/Address/SubDistrict/useSubDistrict';

import { useStyle } from '@magento/venia-ui/lib/classify';
import Field from '@magento/venia-ui/lib/components/Field';
import Select from '@magento/venia-ui/lib/components/Select';
import TextInput from '@magento/venia-ui/lib/components/TextInput';
import defaultClasses from './subDistrict.module.css';

const SubDistrict = props => {
    const {
        classes: propClasses,
        districtCodeField,
        postCodeField,
        fieldSelect,
        label,
        translationId,
        optionValueKey,
        availableSubDistrict = [],
        isRequired,
        ...inputProps
    } = props;
    const { formatMessage } = useIntl();

    const talonProps = useSubDistrict({
        districtCodeField,
        postCodeField,
        fieldSelect,
        optionValueKey,
    });
    const { loading, subDistricts, subDistrict } = talonProps;

    const classes = useStyle(defaultClasses, propClasses);
    const subDistrictProps = {
        classes,
        disabled: loading,
        ...inputProps
    };

    const filteredSubDistricts = useMemo(() => {
        if (availableSubDistrict.length) {
            return subDistricts?.filter(
                item => !item.key || availableSubDistrict.indexOf(item.key) !== -1
            );
        }
        return subDistricts;
    }, [subDistricts, availableSubDistrict]);

    return (
        <>
            <Field
                id={classes.root}
                label={formatMessage({ id: translationId, defaultMessage: label })}
                classes={{ root: classes.root }}
                {...isRequired && { isRequired }}
            >
                <Select
                    {...subDistrictProps}
                    field={fieldSelect}
                    id={classes.root}
                    items={filteredSubDistricts}
                    className={(!subDistrict || subDistrict === '') ? 'disabled:text-gray-3' : undefined}
                />
            </Field>
            <div className={classes.textField}>
                <TextInput field="sub_district" />
            </div>
        </>
    );
};

export default SubDistrict;

SubDistrict.defaultProps = {
    districtCodeField: 'city_id',
    postCodeField: 'postcode',
    fieldSelect: 'sub_district_id',
    label: 'Sub District',
    translationId: 'subdistrict.label',
    optionValueKey: 'id'
};

SubDistrict.propTypes = {
    classes: shape({
        root: string
    }),
    districtCodeField: string,
    fieldSelect: string,
    label: string,
    translationId: string,
    optionValueKey: string,
    validate: func,
    initialValue: oneOfType([number, string])
};
