import React, { useMemo } from 'react';
import { useFreeGiftSelection } from '@talons/FreeGift/useFreeGiftSelection';
import FreeGiftPopup from './Popup/popup';
import { useScrollLock } from '@magento/peregrine';

const FreeGiftSelection = props => {
  const {
    showButton,
    showModal,
    openModal,
    closeModal,
    originalHtml,
    giftItems,
    loading,
    error,
    popupConfig,
    itemActions,
    handleAddItemToCart,
    totalQtySelected,
    onChangeQtyBtn
  } = useFreeGiftSelection(props);

  useScrollLock(showModal);

  const prepareHtml = useMemo(
    () =>
      originalHtml && originalHtml.includes('<a')
        ? originalHtml.replace(/href=((\\")|'|").*?\1/g, '')
        : originalHtml,
    [originalHtml]
  );

  if (showButton) {
    return (
      <>
          <button
            className="bg-green-1 px-4 h-12 mb-4 ring-1 ring-inset ring-green-2 rounded-lg w-full text-sm"
            onClick={openModal}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: prepareHtml
              }}
            />
          </button>
        <FreeGiftPopup
          isOpen={showModal}
          closePopup={closeModal}
          data={giftItems}
          loading={loading}
          error={error}
          config={popupConfig}
          itemActions={itemActions}
          handleAddItemToCart={handleAddItemToCart}
          availableQty={props.data?.common_qty}
          totalQtySelected={totalQtySelected}
          onChangeQtyBtn={onChangeQtyBtn}
        />
      </>
    );
  }

  return null;
};

export default FreeGiftSelection;
