import { useCallback, useState } from 'react';
import { useScrollLock } from '@magento/peregrine';

export const useGiftPromotions = () => {
  const [showModal, setShowModal] = useState(false);

  useScrollLock(showModal);

  const triggerModal = useCallback(() => {
    setShowModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
  } ,[])

  return {
    showModal,
    triggerModal,
    closeModal
  };
};
