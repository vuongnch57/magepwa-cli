import React, { useMemo } from 'react';
import { useIntl } from 'react-intl';
import { func, number, oneOfType, shape, string } from 'prop-types';
import { useDistrict } from 'src/talons/Address/District/useDistrict';

import { useStyle } from '@magento/venia-ui/lib/classify';
import Field from '@magento/venia-ui/lib/components/Field';
import Select from '@magento/venia-ui/lib/components/Select';
import TextInput from '@magento/venia-ui/lib/components/TextInput';
import defaultClasses from './district.module.css';

const District = props => {
    const {
        classes: propClasses,
        regionCodeField,
        fieldSelect,
        label,
        translationId,
        optionValueKey,
        availableDistrict = [],
        isRequired,
        ...inputProps
    } = props;
    const { formatMessage } = useIntl();

    const talonProps = useDistrict({
        regionCodeField,
        fieldSelect,
        optionValueKey
    });
    const { loading, districts, district } = talonProps;

    const classes = useStyle(defaultClasses, propClasses);
    const districtProps = {
        classes,
        disabled: loading,
        ...inputProps
    };

    const filteredDistricts = useMemo(() => {
        if (availableDistrict.length) {
            return districts?.filter(
                item => !item.key || availableDistrict.indexOf(item.key) !== -1
            );
        }
        return districts;
    }, [districts, availableDistrict]);

    return (
        <>
            <Field
                id={classes.root}
                label={formatMessage({ id: translationId, defaultMessage: label })}
                classes={{ root: classes.root }}
                {...isRequired && { isRequired }}
            >
                <Select
                    {...districtProps}
                    field={fieldSelect}
                    id={classes.root}
                    items={filteredDistricts}
                    className={(!district || district === '') ? 'text-gray-3' : undefined}
                />
            </Field>
            <div className={classes.textField}>
                <TextInput field="city" />
            </div>
        </>
    );
};

export default District;

District.defaultProps = {
    regionCodeField: 'region',
    fieldSelect: 'city_id',
    label: 'District',
    translationId: 'district.label',
    optionValueKey: 'id'
};

District.propTypes = {
    classes: shape({
        root: string
    }),
    regionCodeField: string,
    fieldSelect: string,
    label: string,
    translationId: string,
    optionValueKey: string,
    validate: func,
    initialValue: oneOfType([number, string])
};
