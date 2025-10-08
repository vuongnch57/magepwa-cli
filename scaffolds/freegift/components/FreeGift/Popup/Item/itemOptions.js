/* eslint-disable jsx-a11y/no-onchange */
import React from 'react';
import { useIntl } from 'react-intl';

const FreeGiftOption = props => {
  const { options, onChangeOption, selected, selectedOptions, uid } = props;
  const { formatMessage } = useIntl();

  if (!options) {
    return null;
  }

  return (
    <>
      {options.length > 0 ? (
        <div className="flex flex-col gap-y-2 mt-2">
          {options.map(option => {
            const { values, attribute_code, label } = option;
            const fullOptions = [...values];
            fullOptions.unshift({
              label: formatMessage(
                {
                  id: 'freeGift.selectAnOption',
                  defaultMessage: 'Select {option}'
                },
                {
                  option: label
                }
              ),
              uid: '',
              checked: false
            });
            const selectedOptionValue = selectedOptions?.[attribute_code];
            return (
              <div key={attribute_code} className="pr-[1px]">
                <select
                  className={`rounded-[50px] h-9 text-sm bg-white w-fit ${
                    selected ? 'selected' : ''
                  }`}
                  onClick={(e) => e.stopPropagation()}
                  onChange={onChangeOption(uid, attribute_code)}
                  value={selectedOptionValue || ''}
                  disabled={!selected}
                >
                  {fullOptions.map(option => {
                    const { label, uid } = option;
                    return (
                      <option key={uid} value={uid}>
                        {label}
                      </option>
                    );
                  })}
                </select>
              </div>
            );
          })}
        </div>
      ) : null}
    </>
  );
};

export default FreeGiftOption;
