import React, { useMemo } from "react";
import { useIntl } from "react-intl";
import { useGiftPromotions } from "@talons/FreeGift/useGiftPromotions";
import GiftIcon from "./Icons/GiftIcon";
import GiftPromotions from "./giftPromotions";

const Step = ({ children, active }) => {
  return (
    <div
      className={`z-10 w-10 h-10 p-1 flex items-center justify-center rounded-[50px] border border-solid ${
        active ? "border-primary bg-primary" : "border-gray-2 bg-gray-2"
      }`}
    >
      {children}
    </div>
  );
};

const Progress = ({ count }) => {
  return (
    <div className="w-[89px] h-[3px] bg-gray-2 absolute">
      <div
        style={{ width: count === 1 ? "50%" : count > 1 ? "100%" : 0 }}
        className={"bg-primary h-full"}
      />
    </div>
  );
};

const FreeGiftBlock = ({ data, container, rules }) => {
  const { formatMessage } = useIntl();
  const { triggerModal, ...modalProps } = useGiftPromotions({ skip: !data });

  const [ruleIds, countAppliedRules, countAvailableRules, listRules] =
    useMemo(() => {
      const { applied_rule_ids, items } = rules || {};
      const ruleIds = (applied_rule_ids || "").split(",").filter(Boolean);
      return [ruleIds, ruleIds.length, items?.length || 0, items || []];
    }, [rules]);

  if (!data) {
    return null;
  }

  return (
    <div className="bg-gray-1 rounded-[12px] p-3">
      <div className="flex items-center justify-center gap-x-2 relative">
        <Progress count={countAppliedRules} />
        <Step active={countAvailableRules > 0}>
          <span className="text-xs font-bold">
            {formatMessage({
              id: "freeGift.start",
              defaultMessage: "Start",
            })}
          </span>
        </Step>
        <Step active={countAppliedRules === 1 || countAppliedRules >= 2}>
          <GiftIcon />
        </Step>
        <Step active={countAppliedRules >= 2}>
          <GiftIcon />
        </Step>
      </div>
      {countAvailableRules > 0 && (
        <div className="mt-4 flex justify-between items-center text-sm gap-x-6">
          <span className="text-green-secondary">
            {formatMessage(
              {
                id: "freeGift.freeGiftAvailable",
                defaultMessage: "{count} Free Gift(s) Available!",
              },
              {
                count: countAvailableRules,
              }
            )}
          </span>
          <button
            type="button"
            onClick={triggerModal}
            className="underline cursor-pointer"
          >
            {formatMessage({
              id: "freeGift.seeAllOffers",
              defaultMessage: "See all offers",
            })}
          </button>
        </div>
      )}
      <GiftPromotions
        {...{
          ...modalProps,
          promotions: listRules,
          container,
          count: countAppliedRules,
          ruleIds,
        }}
      />
    </div>
  );
};

export default FreeGiftBlock;
