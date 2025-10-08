import React from "react";
import GiftIcon from "./Icons/GiftIcon";
import CheckboxCheckedRound from "./Icons/CheckboxCheckedRound";
import { classNames } from "@utils/format";

import classes from "./promotionItem.module.css";
import { FormattedMessage } from "react-intl";
import { getDateString } from "@utils/time";

const PromotionItem = (props) => {
  const { data, ruleIds } = props || {};
  const { name, rule_id, to_date } = data || {};
  const isChecked = ruleIds?.includes(String(rule_id));
  const expDate = getDateString(to_date);

  return (
    <div className={classNames(classes.root, isChecked ? classes.checked : "")}>
      <GiftIcon />
      <div className={classes.content}>
        <p className={classes.name}>{name}</p>
        {expDate ? (
          <p className={classes.expDate}>
            <FormattedMessage id="miniCart.expired" defaultMessage="Expired:" />{" "}
            {expDate}
          </p>
        ) : null}
      </div>
      <div className={classes.checkedIcon}>
        {isChecked ? <CheckboxCheckedRound /> : null}
      </div>
    </div>
  );
};

export default PromotionItem;
