/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useMemo } from 'react';
import FreeGiftQuantity from './quantity';
import FreeGiftOption from './itemOptions';
import Price from '@magento/venia-ui/lib/components/Price';
import CheckboxCheckedCircle from '../../Icons/CheckboxCheckedCircle';
import Button from '@magento/venia-ui/lib/components/Button';

const FreeGiftPopupItem = props => {
  const {
    data: {
      small_image,
      url_key: urlKey,
      selected,
      uid,
      rule_id,
      name,
      xLeft,
      qty,
      price_range,
      configurable_options: options,
      showRemainingGift: showXLeft,
      selectedOptions,
      error
    },
    config: { selectionMethod, addButtonTitle, displayOrginalPrice },
    actions: {
      onSelectItem,
      onChangeQty,
      onChangeOption,
      onBlurQuantity,
      onChangeQtyBtn,
      onAddToCart
    }
  } = props;

  const isSelected = selected && selectionMethod !== 0;

  const itemPrice = useMemo(() => {
    const regularPrice = price_range?.minimum_price?.regular_price;
    return (
      <div className="flex items-baseline mt-2">
        <div className="text-secondary-red font-bold">
          <Price currencyCode={regularPrice?.currency} value={0} />
        </div>
        {displayOrginalPrice === '1' && (
          <div className="text-gray-4 line-through ml-4">
            <Price
              currencyCode={regularPrice?.currency}
              value={regularPrice?.value}
            />
          </div>
        )}
      </div>
    );
  }, [price_range?.minimum_price?.regular_price, displayOrginalPrice]);

  return (
    <div
      className={`flex sm_flex-col items-start rounded-xl border border-gray-2 p-4 relative ${
        selectionMethod !== 0 ? 'cursor-pointer' : ''
      } ${isSelected ? 'bg-gray-1' : ''}`}
      {...(selectionMethod !== 0 ? { onClick: () => onSelectItem(uid) } : {})}
    >
      <img
        className="block w-[74px] sm_w-full aspect-2/3 object-contain object-center"
        src={small_image?.url}
        alt={urlKey}
      />
      {isSelected && (
        <CheckboxCheckedCircle className="absolute top-2 left-2" />
      )}
      <div className="ml-4 sm_ml-0 sm_mt-4 w-full">
        <span className="line-clamp-2 text-start">{name}</span>
        {itemPrice}
        <FreeGiftOption
          {...{
            selected: selectionMethod === 0 ? true : selected,
            options,
            uid,
            rule_id,
            onChangeOption,
            selectedOptions
          }}
        />
        {selectionMethod === 0 ? (
          <Button
            priority="secondary"
            size="small"
            className="mt-2"
            onClick={() => onAddToCart(uid)}
          >
            {addButtonTitle}
          </Button>
        ) : (
          <FreeGiftQuantity
            {...{
              selected,
              onChangeQty,
              onBlurQuantity,
              qty,
              showXLeft,
              uid,
              rule_id,
              xLeft,
              onChangeQtyBtn
            }}
          />
        )}
        {error && (
          <div className="text-secondary-red text-sm mt-2">{error}</div>
        )}
      </div>
    </div>
  );
};

export default FreeGiftPopupItem;
