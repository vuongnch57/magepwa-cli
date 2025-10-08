import { useMutation } from '@apollo/client';
import { useFreeGift } from './useFreeGift';
import operations from './freeGift.gql';
import { useEffect, useMemo, useState, useCallback } from 'react';
import { useCartContext } from '@magento/peregrine/lib/context/cart';
import { useIntl } from 'react-intl';
import { useToasts } from '@magento/peregrine';
import { useLocation } from 'react-router-dom';
import { useAppliedCartRules } from '../AppliedCartRules/useAppliedCartRules';

export const hasGiftOrNot = giftItemsData => {
  const ruleItems = giftItemsData?.items || [];
  if (!ruleItems || ruleItems?.length <= 0) return false;
  const hasAnyGift = ruleItems.some(ruleItem => {
    const listGiftItems = ruleItem?.free_items || [];
    return listGiftItems && listGiftItems?.length > 0;
  });
  return hasAnyGift;
};

const findItemById = (uid, items) => items.find(item => item.uid === uid);

const countItemsRuleOne = (findItem, items) => {
  const { rule_id, rule_type, free_item_qty_available } = findItem;
  let canSelectItem = true;
  if (rule_type === 1) {
    const ruleOneList = items.filter(item => item.rule_id == rule_id);
    let totalQty = ruleOneList.reduce((total, item) => total + item.qty, 0);
    if (findItem.selected) {
      totalQty = totalQty - findItem.qty;
    }
    if (totalQty >= free_item_qty_available) {
      canSelectItem = false;
    } else {
      const itemQtyToChange = findItem.selected ? 0 : 1;
      ruleOneList.forEach(item => {
        item.xLeft = free_item_qty_available - totalQty - itemQtyToChange;
      });
    }
  }
  if (canSelectItem) {
    findItem.error = '';
    findItem.selected = !findItem.selected;
    findItem.qty = !findItem.selected ? 0 : 1;
  }
};

const setQty = (item, newQty, items) => {
  if (item.rule_type === 1) {
    if (
      +newQty >= 0 &&
      (newQty < item.qty || (newQty > item.qty && 0 < item.xLeft))
    ) {
      item.error = '';
      item.qty = newQty;
    }
    const ruleOneList = items.filter(item => item.rule_id == item.rule_id);
    const totalQty = ruleOneList.reduce((total, item) => total + item.qty, 0);
    ruleOneList.forEach(item => {
      item.xLeft = item.free_item_qty_available - totalQty;
    });
  } else {
    if (+newQty >= 0 && +newQty <= item.free_item_qty_available) {
      item.error = '';
      item.qty = newQty;
      item.xLeft = item.free_item_qty_available - +newQty;
    }
  }
};

const isSelectedAllOptions = item => {
  return (
    Object.keys(item.selectedOptions).filter(
      key => item.selectedOptions[key] && item.selectedOptions[key] != ''
    ).length == item.configurable_options.length
  );
};

export const useFreeGiftSelection = props => {
  const { data: giftItemsData } = props;
  const { addFreeItemsToCart } = operations;
  const { config: freeGiftConfig } = useFreeGift();
  const [{ cartId }] = useCartContext();
  const { formatMessage } = useIntl();
  const [, { addToast }] = useToasts();
  const { hash } = useLocation();

  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState();

  const { cartRulesLoading, getAppliedRules } = useAppliedCartRules();

  const [requestAddFreeItem, { loading }] = useMutation(addFreeItemsToCart, {
    onCompleted: getAppliedRules
  });

  const showButton = useMemo(() => hasGiftOrNot(giftItemsData), [
    giftItemsData
  ]);

  const totalQtySelected = useMemo(() => {
    return items.reduce((result, item) => {
      result = result + item.qty;
      return result;
    }, 0);
  }, [items]);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setError(null);
    setItems(prev => prev.map(item => ({ ...item, selected: false })));
  };

  useEffect(() => {
    if (
      ((freeGiftConfig && freeGiftConfig.ampromo_messages_auto_open_popup) ||
        hash === '#choose-gift') &&
      showButton
    ) {
      setShowModal(true);
    }
  }, [freeGiftConfig, showButton, hash]);

  useEffect(() => {
    const flattenItems = (giftItemsData?.items || []).reduce(
      (acc, ruleItem) => {
        const { rule_id, rule_type, discount_amount, free_items } = ruleItem;
        free_items.forEach(item => {
          acc.push({
            ...item,
            uid: `${rule_id}_${rule_type}_${item.uid}`,
            rule_id,
            rule_type,
            discount_amount,
            showRemainingGift:
              freeGiftConfig?.ampromo_messages_display_remaining_gifts_counter,
            xLeft: item.free_item_qty_available,
            qty: 0,
            count: 0,
            selectedOptions: {},
            selected: false,
            error: ''
          });
        });
        return acc;
      },
      []
    );
    setItems(flattenItems);
  }, [freeGiftConfig, giftItemsData]);

  const handleAddItemToCart = useCallback(
    async itemsToAdd => {
      setError(null);
      let isValid = true;
      const newItems = !Array.isArray(itemsToAdd)
        ? JSON.parse(JSON.stringify(items))
        : itemsToAdd;
      newItems.forEach(item => {
        if (item.selected) {
          if (+item.qty <= 0) {
            item.error = formatMessage({
              id: 'freeGift.pleaseEnterQty',
              defaultMessage: 'Please enter gift quantity'
            });
            isValid = false;
          } else if (
            item.configurable_options &&
            (!Object.keys(item.selectedOptions).length ||
              !isSelectedAllOptions(item))
          ) {
            item.error = formatMessage({
              id: 'freeGift.pleaseSelectOption',
              defaultMessage: 'Please select gift option'
            });
            isValid = false;
          }
        }
      });
      
      if (!isValid) {
        setItems([...newItems]);
        return;
      }

      const selectedItems = newItems.filter(item => item.selected);
      
      if (!selectedItems || !selectedItems.length) {
        setError(
          formatMessage({
            id: 'freeGift.pleaseSelectGift',
            defaultMessage: 'Please select gift item'
          })
        );
        return;
      }

      const selectedItemKus = [];
      const data = selectedItems.map(
        ({ qty, sku, selectedOptions, rule_id }) => {
          selectedItemKus.push(sku);
          return {
            sku,
            quantity: +qty,
            rule_id: rule_id,
            selected_options: Object.keys(selectedOptions).map(
              key => selectedOptions[key]
            )
          };
        }
      );
      try {
        const { data: responseData } = await requestAddFreeItem({
          variables: { input: { cart_id: cartId, free_items: data } }
        });

        const userErrors = responseData?.addFreeItems?.user_errors;
        if (
          freeGiftConfig?.ampromo_messages_display_error_messages === '1' &&
          userErrors &&
          userErrors?.length > 0
        ) {
          setError(userErrors[0]?.message);
        } else {
          if (freeGiftConfig?.ampromo_messages_display_success_messages === '1') {
            (responseData?.addFreeItems?.cart?.items || []).forEach(item => {
              if (selectedItemKus.includes(item.product.sku)) {
                addToast({
                  type: 'success',
                  message: formatMessage(
                    {
                      id: 'freeGift.addItemSuccess',
                      defaultMessage:
                        'Free gift {name} was added to your shopping cart'
                    },
                    {
                      name: item.product.name
                    }
                  ),
                  timeout: 5000
                });
              }
            });
          }
          closeModal();
        }
      } catch (error) {
        setError(error.message);
      }
    },
    [addToast, cartId, formatMessage, freeGiftConfig, items, requestAddFreeItem]
  );

  const onSelectItem = useCallback(
    id => {
      const newItems = JSON.parse(JSON.stringify(items));
      const findItem = findItemById(id, newItems);
      if (findItem) {
        if(findItem.xLeft === 0 && !findItem.selected) {
          return;
        }
        countItemsRuleOne(findItem, newItems);
        setItems([...newItems]);
      }

      return newItems;
    },
    [items]
  );

  const onChangeQty = useCallback(
    id => {
      const newItems = JSON.parse(JSON.stringify(items));
      const findItem = findItemById(id, newItems);
      return event => {
        const newVal = event.target.value;
        const param = newVal !== '' ? +newVal : '';
        if (findItem && findItem.qty !== param) {
          setQty(findItem, param, newItems);
          // countItemsRuleOne(findItem, newItems);
          setItems([...newItems]);
        }
      };
    },
    [items]
  );

  const onChangeQtyBtn = useCallback(
    (id, newQty) => {
      const newItems = JSON.parse(JSON.stringify(items));
      const findItem = findItemById(id, newItems);
      setQty(findItem, newQty, newItems);
      setItems([...newItems]);
    },
    [items]
  );

  const onBlurQuantity = useCallback(
    id => {
      const newItems = JSON.parse(JSON.stringify(items));
      const findItem = findItemById(id, newItems);
      return event => {
        const value = event.target.value;
        if (value === '' && findItem) {
          setQty(findItem, 0, newItems);
          setItems([...newItems]);
        }
      };
    },
    [items]
  );

  const onChangeOption = useCallback(
    (id, attrCode) => {
      const newItems = JSON.parse(JSON.stringify(items));
      const findItem = findItemById(id, newItems);
      return event => {
        const value = event.target.value;
        if (findItem) {
          findItem.selectedOptions[attrCode] = value;
          if (isSelectedAllOptions(findItem)) {
            findItem.error = '';
          }
          setItems([...newItems]);
        }
      };
    },
    [items]
  );

  const onAddToCart = useCallback(
    id => {
      const newItems = items.map(item => ({
        ...item,
        ...(item.uid === id
          ? {
              selected: item.uid === id ? true : false,
              qty: 1
            }
          : {})
      }));
      handleAddItemToCart(newItems);
    },
    [handleAddItemToCart, items]
  );

  return {
    showButton,
    showModal,
    closeModal,
    openModal,
    originalHtml: freeGiftConfig?.ampromo_messages_add_message,
    giftItems: items,
    handleAddItemToCart,
    popupConfig: {
      title: freeGiftConfig?.ampromo_messages_popup_title,
      addButtonTitle: freeGiftConfig?.ampromo_messages_add_button_title,
      numberItemsPerRow: freeGiftConfig?.ampromo_messages_gifts_qty_for_popup,
      selectionMethod: freeGiftConfig?.ampromo_messages_gift_selection_method,
      displayRemainingCounter:
        freeGiftConfig?.ampromo_messages_display_remaining_gifts_counter,
      displayOrginalPrice: freeGiftConfig?.ampromo_messages_show_price_in_popup
    },
    itemActions: {
      onSelectItem,
      onChangeQty,
      onChangeOption,
      onBlurQuantity,
      onChangeQtyBtn,
      onAddToCart
    },
    loading: loading || cartRulesLoading,
    error,
    totalQtySelected
  };
};
