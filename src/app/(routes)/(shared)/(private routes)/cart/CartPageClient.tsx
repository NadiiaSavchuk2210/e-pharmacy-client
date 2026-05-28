'use client';

import { useAuth } from '@/features/auth/model';
import { EMPTY_CART, useUserCartQuery } from '@/features/cart';
import PageTitle from '@/shared/ui/PageTitle';

import { useCartCheckoutDraft } from './model/useCartCheckoutDraft';
import { useCartPageActions } from './model/useCartPageActions';
import {
  CartCheckoutForm,
  CartEmptyState,
  CartErrorState,
  CartLoadingState,
} from './ui';

const CartPageClient = () => {
  const { user, isAuthLoading } = useAuth();
  const { clearDraft, initialValues, saveDraft } = useCartCheckoutDraft(user);
  const cartQuery = useUserCartQuery(user?.id);
  const cart = cartQuery.data ?? EMPTY_CART;
  const isCartLoading =
    isAuthLoading || cartQuery.isPending || cartQuery.isPlaceholderData;
  const {
    handleCheckoutSubmit,
    handleQuantityChange,
    isCartBusy,
    isCheckoutPending,
    pendingProductId,
  } = useCartPageActions({ user, cart, onCheckoutSuccess: clearDraft });

  const renderCartContent = () => {
    if (cartQuery.isError) {
      return <CartErrorState onRetry={() => void cartQuery.refetch()} />;
    }

    if (isCartLoading) {
      return <CartLoadingState />;
    }

    if (cart.items.length === 0) {
      return <CartEmptyState />;
    }

    return (
      <CartCheckoutForm
        cart={cart}
        initialValues={initialValues}
        isCartBusy={isCartBusy}
        isCheckoutPending={isCheckoutPending}
        pendingProductId={pendingProductId}
        onQuantityChange={handleQuantityChange}
        onSubmit={handleCheckoutSubmit}
        onValuesChange={saveDraft}
      />
    );
  };

  return (
    <div className="bg-bg-subtle">
      <section className="container | py-space-40 pb-space-80 max-[374px]:[--container-padding:12px] md:py-[52px] md:pb-[100px] lg:pt-[68px] lg:pb-[120px] lg:[--container-max:1184px]">
        <PageTitle className="mb-space-40 md:mb-space-32 lg:mb-space-40">
          Cart
        </PageTitle>
        {renderCartContent()}
      </section>
    </div>
  );
};

export default CartPageClient;
