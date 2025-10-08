/* eslint-disable jsx-a11y/no-autofocus */
import React from "react";
import { FormattedMessage } from "react-intl";
import { Portal } from "@magento/venia-ui/lib/components/Portal";
import { FocusScope } from "react-aria";
import Mask from "@magento/venia-ui/lib/components/Mask";
import CloseIcon from "../Icons/CloseIcon";
import GiftIconThin from "../Icons/GiftIconThin";
import FreeGiftPopupItem from "./Item/item";
import Button from "@magento/venia-ui/lib/components/Button/button";
import { useStyle } from "@magento/venia-ui/lib/classify";
import { useScrollLock, useWindowSize } from "@magento/peregrine";

import defaultClasses from "./popup.module.css";

const FreeGiftPopup = (props) => {
  const {
    isOpen,
    closePopup,
    data,
    loading,
    error,
    config,
    itemActions,
    handleAddItemToCart,
    availableQty,
    totalQtySelected,
  } = props;
  const classes = useStyle(defaultClasses, props.classes);
  const modalClass = isOpen ? classes.root_open : classes.root;
  const windowSize = useWindowSize();

  useScrollLock(isOpen);

  return (
    <Portal>
      <FocusScope contain restoreFocus autoFocus>
        <aside className={modalClass} data-cy="CouponModal-root">
          <Mask
            isActive={isOpen}
            dismiss={closePopup}
            data-cy="App-Mask-button"
          />
          <div
            className={`${classes.body} ${
              windowSize.innerHeight < 773
                ? "sm_max-h-screen"
                : "sm_max-h-[773px]"
            }`}
          >
            <div className={classes.header}>
              <h2 className={classes.headerTitle}>{config.title}</h2>
              <button
                onClick={closePopup}
                aria-disabled={false}
                className="p-2"
              >
                <CloseIcon width={20} height={20} />
              </button>
            </div>
            <div className={classes.content}>
              {error && (
                <div className="w-full text-secondary-red text-start mb-2">
                  {error}
                </div>
              )}
              {config.displayRemainingCounter ? (
                <div className="text-gray-4">
                  <FormattedMessage
                    id="freeGift.popupMessage"
                    defaultMessage="GWP FREE GIFT ซื้อครบ 4500 ฟรี กระเป๋าคาดอก (You can choose {qty} more item(s).)"
                    values={{
                      qty: availableQty - totalQtySelected,
                    }}
                  />
                </div>
              ) : null}
              <div className={classes.gridItems}>
                {data.map((item, index) => {
                  return (
                    <FreeGiftPopupItem
                      key={index}
                      data={item}
                      classes={classes}
                      config={config}
                      actions={itemActions}
                    />
                  );
                })}
              </div>
            </div>
            {config.displayRemainingCounter || config.selectionMethod !== 0 ? (
              <div className={classes.bottom}>
                {config.displayRemainingCounter ? (
                  <div className="flex gap-x-2">
                    <div className="hidden sm_block">
                      <GiftIconThin />
                    </div>
                    <div className="flex w-full sm_flex-col items-center sm_items-start justify-between mb-3 sm_mb-0">
                      <div className="text-sm font-bold">
                        <FormattedMessage
                          id="freeGift.youCanSelect"
                          defaultMessage="You can select {qty} Free Gift"
                          values={{
                            qty: availableQty - totalQtySelected,
                          }}
                        />
                      </div>
                      <div className="text-gray-5 text-sm">
                        {"("}
                        <FormattedMessage
                          id="freeGift.selected"
                          defaultMessage="Selected: {qty}"
                          values={{
                            qty: totalQtySelected,
                          }}
                        />
                        {")"}
                      </div>
                    </div>
                  </div>
                ) : null}
                {config.selectionMethod !== 0 && (
                  <Button onClick={handleAddItemToCart} disabled={loading}>
                    <FormattedMessage
                      id="freeGift.continueCheckout"
                      defaultMessage="Continue Checkout"
                    />
                  </Button>
                )}
              </div>
            ) : (
              <div className="h-0 sm_h-[77px]" />
            )}
          </div>
        </aside>
      </FocusScope>
    </Portal>
  );
};

export default FreeGiftPopup;
