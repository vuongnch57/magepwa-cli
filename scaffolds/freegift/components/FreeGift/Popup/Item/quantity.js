import React from "react";
import MinusIcon from "../../Icons/MinusIcon";
import PlusIcon from "../../Icons/PlusIcon";

const FreeGiftQuantity = (props) => {
  const {
    uid,
    qty,
    // showXLeft,
    xLeft,
    selected,
    onChangeQty,
    onBlurQuantity,
    onChangeQtyBtn,
  } = props;

  const buttonClass =
    "bg-white h-9 inline-flex items-center justify-center rounded-full w-9 disabled_cursor-default";
  const isDecrementDisabled = !selected || qty === 0;
  const isIncrementDisabled = !selected || xLeft === 0;

  // const remainGift = useMemo(
  //   () =>
  //     showXLeft
  //       ? formatMessage(
  //           {
  //             id: 'freeGift.xGiftLeft',
  //             defaultMessage: '{qty} left'
  //           },
  //           { qty: xLeft }
  //         )
  //       : null,
  //   [formatMessage, showXLeft, xLeft]
  // );
  return (
    <div className="flex items-center gap-x-3 mt-2">
      <div className="flex items-center gap-x-2">
        <button
          className={buttonClass}
          disabled={isDecrementDisabled}
          onClick={(e) => {
            e.stopPropagation();
            onChangeQtyBtn(uid, qty - 1);
          }}
          type="button"
        >
          <MinusIcon color={isDecrementDisabled ? "#8C9198" : "#181818"} />
        </button>
        <input
          className="text-center text-black !bg-gray-1 !h-9 !w-9 p-2 !border-0 font-bold text-sm focus_!shadow-none focus_!border-0 disabled_!bg-white"
          disabled={!selected}
          onClick={(e) => e.stopPropagation()}
          onChange={onChangeQty(uid)}
          onBlur={onBlurQuantity(uid)}
          value={qty}
          type={"number"}
          min="0"
        />
        <button
          className={buttonClass}
          disabled={isIncrementDisabled}
          onClick={(e) => {
            e.stopPropagation();
            onChangeQtyBtn(uid, qty + 1);
          }}
          type="button"
        >
          <PlusIcon color={isIncrementDisabled ? "#8C9198" : "#181818"} />
        </button>
      </div>
      {/* <span className="text-gray text-1xl">{remainGift}</span> */}
    </div>
  );
};

export default FreeGiftQuantity;
