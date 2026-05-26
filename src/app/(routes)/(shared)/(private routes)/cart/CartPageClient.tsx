'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  type ChangeEvent,
  type FormEvent,
  useMemo,
  useState,
} from 'react';
import toast from 'react-hot-toast';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getPriceLabel, PRODUCT_IMAGE_PLACEHOLDER } from '@/entities/product';
import { useAuth } from '@/features/auth/model';
import {
  EMPTY_CART,
  getCartErrorMessage,
  getCartProductId,
  useCartDeliveryQuoteQuery,
  useCheckoutCartMutation,
  useUpdateUserCartMutation,
  useUserCartQuery,
  type CartItem,
  type PaymentMethod,
  type ShippingInfo,
} from '@/features/cart';
import { cn } from '@/lib/utils';
import { Icon } from '@/shared/ui/Icon';

const PAYMENT_OPTIONS: Array<{
  value: PaymentMethod;
  label: string;
}> = [
  {
    value: 'cash_on_delivery',
    label: 'Cash On Delivery',
  },
  {
    value: 'bank',
    label: 'Bank',
  },
];

const EMPTY_SHIPPING_INFO: ShippingInfo = {
  name: '',
  email: '',
  phone: '',
  address: '',
};

const formatMoney = (value: number) => `$${value.toFixed(2)}`;

const parsePrice = (price: string) => {
  const normalizedPrice = price.replace(',', '.').replace(/[^\d.]/g, '');
  const parsedPrice = Number.parseFloat(normalizedPrice);

  return Number.isNaN(parsedPrice) ? 0 : parsedPrice;
};

const trimShippingInfo = (shippingInfo: ShippingInfo): ShippingInfo => ({
  name: shippingInfo.name.trim(),
  email: shippingInfo.email.trim(),
  phone: shippingInfo.phone.trim(),
  address: shippingInfo.address.trim(),
});

const isShippingInfoComplete = (shippingInfo: ShippingInfo) => {
  return Object.values(trimShippingInfo(shippingInfo)).every(Boolean);
};

const CartPageClient = () => {
  const { user, isAuthLoading } = useAuth();
  const [shippingInfoDraft, setShippingInfoDraft] =
    useState<ShippingInfo | null>(null);
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>('cash_on_delivery');
  const [comment, setComment] = useState('');
  const [pendingProductId, setPendingProductId] = useState<string | null>(null);
  const shippingInfo = useMemo<ShippingInfo>(
    () =>
      shippingInfoDraft ?? {
        ...EMPTY_SHIPPING_INFO,
        name: user?.name ?? '',
        email: user?.email ?? '',
        phone: user?.phone ?? '',
      },
    [shippingInfoDraft, user],
  );
  const cartQuery = useUserCartQuery(user?.id);
  const cart = cartQuery.data ?? EMPTY_CART;
  const updateCartMutation = useUpdateUserCartMutation();
  const checkoutMutation = useCheckoutCartMutation(user?.id);
  const deliveryQuoteQuery = useCartDeliveryQuoteQuery({
    address: shippingInfo.address,
    subtotal: cart.totalPrice,
    enabled: cart.items.length > 0,
  });

  const deliveryQuote = deliveryQuoteQuery.data;
  const deliveryFee = deliveryQuote?.deliveryFee ?? 0;
  const additionalFee = deliveryQuote?.additionalFee ?? 0;
  const orderTotal = useMemo(
    () => cart.totalPrice + deliveryFee + additionalFee,
    [additionalFee, cart.totalPrice, deliveryFee],
  );
  const isCartLoading = isAuthLoading || cartQuery.isPending;
  const isCartBusy = updateCartMutation.isPending || checkoutMutation.isPending;
  const canPlaceOrder =
    cart.items.length > 0 &&
    isShippingInfoComplete(shippingInfo) &&
    !checkoutMutation.isPending;

  const handleShippingInfoChange =
    (field: keyof ShippingInfo) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      setShippingInfoDraft({
        ...shippingInfo,
        [field]: event.target.value,
      });
    };

  const handleQuantityChange = async (item: CartItem, quantity: number) => {
    if (!user || isCartBusy) return;

    const productId = getCartProductId(item.product);
    const nextQuantity = Math.max(0, Math.floor(quantity));

    setPendingProductId(productId);

    try {
      await updateCartMutation.mutateAsync({
        userId: user.id,
        productId,
        quantity: nextQuantity,
      });
    } catch (error) {
      toast.error(getCartErrorMessage(error));
    } finally {
      setPendingProductId(null);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!canPlaceOrder) {
      toast.error('Enter shipping info before placing the order');
      return;
    }

    try {
      const result = await checkoutMutation.mutateAsync({
        shippingInfo: trimShippingInfo(shippingInfo),
        paymentMethod,
        comment: comment.trim() || undefined,
      });

      toast.success(`Order ${result.order.id} placed`);
      setComment('');
    } catch (error) {
      toast.error(getCartErrorMessage(error));
    }
  };

  return (
    <main className="bg-bg py-space-40 md:py-space-60">
      <div className="container flex flex-col gap-space-32">
        <header className="flex flex-col gap-space-8">
          <h1 className="text-28 font-semibold leading-space-32 text-text md:text-36 md:leading-space-44">
            Cart
          </h1>
          <p className="max-w-[42rem] text-14 leading-space-20 text-secondary-text md:text-16 md:leading-space-25">
            Enter your shipping info where you&apos;ll get the product. You can
            also send any other location where you need the products.
          </p>
        </header>

        {isCartLoading ? (
          <div className="rounded-[20px] border border-card-border bg-surface p-space-24 text-14 leading-space-20 text-secondary-text">
            Loading cart...
          </div>
        ) : cartQuery.isError ? (
          <div className="flex flex-col gap-space-16 rounded-[20px] border border-danger/30 bg-surface p-space-24">
            <p className="text-16 font-semibold leading-space-25 text-text">
              Unable to load cart.
            </p>
            <Button
              type="button"
              variant="outline"
              size="pill"
              className="w-fit"
              onClick={() => void cartQuery.refetch()}
            >
              Try again
            </Button>
          </div>
        ) : cart.items.length === 0 ? (
          <div className="flex flex-col gap-space-18 rounded-[20px] border border-card-border bg-surface p-space-24">
            <p className="text-18 font-semibold leading-space-25 text-text">
              Your cart is empty
            </p>
            <p className="max-w-[32rem] text-14 leading-space-20 text-secondary-text">
              Add medicines to the cart and return here to place your order.
            </p>
            <Button asChild variant="primary" size="pill" className="w-fit">
              <Link href="/medicine">Browse medicine</Link>
            </Button>
          </div>
        ) : (
          <form
            className="grid gap-space-32 xl:grid-cols-[minmax(0,1fr)_22rem]"
            onSubmit={handleSubmit}
          >
            <div className="flex min-w-0 flex-col gap-space-24">
              <section className="flex flex-col gap-space-20 rounded-[20px] border border-card-border bg-surface p-space-20 md:p-space-24">
                <div>
                  <h2 className="text-20 font-semibold leading-space-28 text-text">
                    Shipping Information
                  </h2>
                  <p className="mt-space-8 text-14 leading-space-20 text-secondary-text">
                    Delivery and additional fees are calculated based on the
                    information you enter.
                  </p>
                </div>

                <div className="grid gap-space-16 md:grid-cols-2">
                  <div className="flex flex-col gap-space-8">
                    <Label htmlFor="cart-shipping-name">Name</Label>
                    <Input
                      id="cart-shipping-name"
                      name="name"
                      value={shippingInfo.name}
                      autoComplete="name"
                      required
                      onChange={handleShippingInfoChange('name')}
                    />
                  </div>

                  <div className="flex flex-col gap-space-8">
                    <Label htmlFor="cart-shipping-email">Email</Label>
                    <Input
                      id="cart-shipping-email"
                      name="email"
                      type="email"
                      value={shippingInfo.email}
                      autoComplete="email"
                      required
                      onChange={handleShippingInfoChange('email')}
                    />
                  </div>

                  <div className="flex flex-col gap-space-8">
                    <Label htmlFor="cart-shipping-phone">Phone</Label>
                    <Input
                      id="cart-shipping-phone"
                      name="phone"
                      type="tel"
                      value={shippingInfo.phone}
                      autoComplete="tel"
                      required
                      onChange={handleShippingInfoChange('phone')}
                    />
                  </div>

                  <div className="flex flex-col gap-space-8">
                    <Label htmlFor="cart-shipping-address">Address</Label>
                    <Input
                      id="cart-shipping-address"
                      name="address"
                      value={shippingInfo.address}
                      autoComplete="shipping street-address"
                      required
                      onChange={handleShippingInfoChange('address')}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-space-8">
                  <Label htmlFor="cart-comment">Comment</Label>
                  <textarea
                    id="cart-comment"
                    name="comment"
                    value={comment}
                    rows={4}
                    maxLength={1000}
                    className="w-full resize-none rounded-[1.375rem] border border-input-border bg-input-bg px-[1.125rem] py-[0.8125rem] text-12 leading-[1.5] text-text outline-none transition-[border-color,box-shadow] duration-fast ease-fast placeholder:text-text-weak hover:border-input-border-focus focus-visible:border-input-border-focus focus-visible:ring-[3px] focus-visible:ring-input-border-focus/20"
                    onChange={(event) => setComment(event.target.value)}
                  />
                </div>
              </section>

              <section className="flex flex-col gap-space-16 rounded-[20px] border border-card-border bg-surface p-space-20 md:p-space-24">
                <h2 className="text-20 font-semibold leading-space-28 text-text">
                  Payment Method
                </h2>

                <div className="grid gap-space-12 md:grid-cols-2">
                  {PAYMENT_OPTIONS.map((option) => (
                    <Label
                      key={option.value}
                      className={cn(
                        'flex min-h-[3.5rem] cursor-pointer items-center rounded-[1rem] border px-space-16 text-14 leading-space-20 transition-colors',
                        paymentMethod === option.value
                          ? 'border-brand-500 bg-mint-100 text-brand-700'
                          : 'border-card-border bg-bg text-text hover:border-brand-500',
                      )}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={option.value}
                        checked={paymentMethod === option.value}
                        className="mr-space-10 size-4 accent-brand-500"
                        onChange={() => setPaymentMethod(option.value)}
                      />
                      {option.label}
                    </Label>
                  ))}
                </div>
              </section>

              <section className="flex flex-col gap-space-16">
                <h2 className="text-20 font-semibold leading-space-28 text-text">
                  Selected Products
                </h2>

                <ul className="flex flex-col gap-space-12">
                  {cart.items.map((item) => {
                    const productId = getCartProductId(item.product);
                    const isItemPending = pendingProductId === productId;
                    const unitPrice = parsePrice(item.product.price);
                    const itemTotal = unitPrice * item.quantity;

                    return (
                      <li
                        key={productId}
                        className="grid gap-space-16 rounded-[16px] border border-card-border bg-surface p-space-16 md:grid-cols-[5.5rem_minmax(0,1fr)_auto] md:items-center"
                      >
                        <div className="relative h-[5.5rem] w-[5.5rem] overflow-hidden rounded-[12px] bg-bg">
                          <Image
                            src={item.product.photo || PRODUCT_IMAGE_PLACEHOLDER}
                            alt={item.product.name}
                            fill
                            sizes="88px"
                            className="object-contain p-space-12"
                            unoptimized={
                              item.product.photo === PRODUCT_IMAGE_PLACEHOLDER
                            }
                          />
                        </div>

                        <div className="min-w-0">
                          <h3 className="text-16 font-semibold leading-space-25 text-text">
                            {item.product.name}
                          </h3>
                          <p className="mt-space-4 text-14 leading-space-20 text-secondary-text">
                            Unit price: {getPriceLabel(item.product.price)}
                          </p>
                          <p className="mt-space-4 text-14 leading-space-20 text-secondary-text">
                            Total: {formatMoney(itemTotal)}
                          </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-space-12 md:justify-end">
                          <div className="flex h-[2.5rem] items-center overflow-hidden rounded-full border border-card-border bg-bg">
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="size-10 rounded-none"
                              aria-label={`Decrease ${item.product.name} quantity`}
                              disabled={isItemPending || item.quantity <= 1}
                              onClick={() =>
                                void handleQuantityChange(
                                  item,
                                  item.quantity - 1,
                                )
                              }
                            >
                              <Icon name="minus" className="size-4" />
                            </Button>

                            <span className="flex min-w-[2.75rem] justify-center text-14 font-semibold leading-space-20 text-text">
                              {item.quantity}
                            </span>

                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="size-10 rounded-none"
                              aria-label={`Increase ${item.product.name} quantity`}
                              disabled={isItemPending}
                              onClick={() =>
                                void handleQuantityChange(
                                  item,
                                  item.quantity + 1,
                                )
                              }
                            >
                              <Icon name="plus" className="size-4" />
                            </Button>
                          </div>

                          <Button
                            type="button"
                            variant="delete"
                            size="delete"
                            disabled={isItemPending}
                            onClick={() => void handleQuantityChange(item, 0)}
                          >
                            Remove
                          </Button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </section>
            </div>

            <aside className="min-w-0">
              <section className="sticky top-[6rem] flex flex-col gap-space-18 rounded-[20px] border border-card-border bg-surface p-space-20 md:p-space-24">
                <h2 className="text-20 font-semibold leading-space-28 text-text">
                  Order Details
                </h2>

                <dl className="flex flex-col gap-space-12 text-14 leading-space-20">
                  <div className="flex items-center justify-between gap-space-16">
                    <dt className="text-secondary-text">Subtotal</dt>
                    <dd className="font-semibold text-text">
                      {formatMoney(cart.totalPrice)}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-space-16">
                    <dt className="text-secondary-text">Delivery</dt>
                    <dd className="font-semibold text-text">
                      {deliveryQuoteQuery.isFetching
                        ? 'Calculating...'
                        : formatMoney(deliveryFee)}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-space-16">
                    <dt className="text-secondary-text">Additional fees</dt>
                    <dd className="font-semibold text-text">
                      {formatMoney(additionalFee)}
                    </dd>
                  </div>
                  <div className="mt-space-4 flex items-center justify-between gap-space-16 border-t border-card-border pt-space-16">
                    <dt className="text-18 font-semibold leading-space-25 text-text">
                      Total
                    </dt>
                    <dd className="text-18 font-semibold leading-space-25 text-text">
                      {formatMoney(orderTotal)}
                    </dd>
                  </div>
                </dl>

                <p className="text-12 leading-space-18 text-secondary-text">
                  {deliveryQuote?.message ??
                    'Delivery and additional fees will be calculated based on entered data.'}
                </p>

                <Button
                  type="submit"
                  variant="primary"
                  size="pill"
                  className="w-full"
                  disabled={!canPlaceOrder}
                >
                  {checkoutMutation.isPending ? 'Placing...' : 'Place order'}
                </Button>
              </section>
            </aside>
          </form>
        )}
      </div>
    </main>
  );
};

export default CartPageClient;
