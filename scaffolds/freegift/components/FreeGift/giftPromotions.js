import React from 'react';
import { useIntl } from 'react-intl';
import Dialog from '@magento/venia-ui/lib/components/Dialog';
import PromotionItem from './promotionItem';

import classes from './giftPromotions.module.css';

const GiftPromotions = props => {
  const { showModal, closeModal, promotions, ruleIds, container, count } =
    props || {};
  const { formatMessage } = useIntl();

  return (
    <Dialog
      title={formatMessage({
        id: 'miniCart.freeGifts',
        defaultMessage: 'Free Gifts'
      })}
      confirmTranslationId={'global.close'}
      confirmText="Close"
      formProps={{}}
      isOpen={showModal}
      onCancel={closeModal}
      onConfirm={closeModal}
      shouldShowCancelBtn={false}
      notFullMobile={false}
      btnSize="medium"
      portalContainer={container}
      dialogClassName={classes.dialog}
      buttonsClassName={classes.buttons}
    >
      <p className={classes.successTxt}>
        {formatMessage(
          {
            id: 'miniCart.gotXFreeGift',
            defaultMessage: 'Congratulations! You got {count} free gift(s).'
          },
          { count }
        )}
      </p>
      <p className={classes.remarkTxt}>
        {formatMessage({
          id: 'miniCart.freeGiftRemark',
          defaultMessage:
            '*Remark: Free gift from coupon code will not appear in this modal.'
        })}
      </p>
      <div className={classes.promotions}>
        {(promotions || []).map(promotion => {
          const { name, rule_id } = promotion;
          return (
            <PromotionItem
              key={`${name}_${rule_id}`}
              data={promotion}
              ruleIds={ruleIds}
            />
          );
        })}
      </div>
    </Dialog>
  );
};

export default GiftPromotions;
