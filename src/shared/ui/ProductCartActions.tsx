import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Icon } from '@/shared/ui/Icon';

import type { ComponentProps, ReactNode } from 'react';

type ButtonProps = ComponentProps<typeof Button>;

export type ProductCartActionsClassNames = {
  quantityControl?: string;
  quantityButton?: string;
  quantityIcon?: string;
  quantityValue?: string;
  actionButton?: string;
};

export type ProductCartActionsProps = {
  quantity?: number;
  quantityAriaLabel?: string;
  increaseAriaLabel?: string;
  decreaseAriaLabel?: string;
  onIncrease?: () => void;
  onDecrease?: () => void;
  increaseDisabled?: boolean;
  decreaseDisabled?: boolean;
  quantityDisabled?: boolean;
  actionLabel: ReactNode;
  actionAriaLabel: string;
  onAction: () => void;
  actionVariant?: ButtonProps['variant'];
  actionSize?: ButtonProps['size'];
  actionDisabled?: boolean;
  disabled?: boolean;
  className?: string;
  classNames?: ProductCartActionsClassNames;
};

const BASE_QUANTITY_CONTROL_CLASS =
  'flex items-center justify-center rounded-full border border-card-border bg-bg';

const BASE_QUANTITY_BUTTON_CLASS =
  'rounded-full text-brand-500 hover:bg-transparent hover:text-brand-700 focus-visible:bg-transparent';

const BASE_QUANTITY_VALUE_CLASS =
  'flex min-w-[1.5rem] justify-center font-normal text-text';

export const ProductCartActions = ({
  quantity,
  quantityAriaLabel = 'Product quantity',
  increaseAriaLabel = 'Increase product quantity',
  decreaseAriaLabel = 'Decrease product quantity',
  onIncrease,
  onDecrease,
  increaseDisabled = false,
  decreaseDisabled = false,
  quantityDisabled = false,
  actionLabel,
  actionAriaLabel,
  onAction,
  actionVariant = 'primary',
  actionSize = 'pill',
  actionDisabled = false,
  disabled = false,
  className,
  classNames,
}: ProductCartActionsProps) => {
  const shouldShowQuantity =
    typeof quantity === 'number' && Number.isFinite(quantity);
  const areQuantityButtonsDisabled = disabled || quantityDisabled;
  const isActionDisabled = disabled || actionDisabled;

  return (
    <div
      className={cn(
        'flex items-center justify-between gap-space-16',
        className,
      )}
    >
      {shouldShowQuantity ? (
        <div
          className={cn(
            BASE_QUANTITY_CONTROL_CLASS,
            classNames?.quantityControl,
          )}
          role="group"
          aria-label={quantityAriaLabel}
        >
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className={cn(BASE_QUANTITY_BUTTON_CLASS, classNames?.quantityButton)}
            aria-label={increaseAriaLabel}
            disabled={areQuantityButtonsDisabled || increaseDisabled || !onIncrease}
            onClick={onIncrease}
          >
            <Icon
              name="plus"
              className={cn('size-4', classNames?.quantityIcon)}
            />
          </Button>

          <span
            className={cn(
              BASE_QUANTITY_VALUE_CLASS,
              classNames?.quantityValue,
            )}
          >
            {quantity}
          </span>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className={cn(BASE_QUANTITY_BUTTON_CLASS, classNames?.quantityButton)}
            aria-label={decreaseAriaLabel}
            disabled={areQuantityButtonsDisabled || decreaseDisabled || !onDecrease}
            onClick={onDecrease}
          >
            <Icon
              name="minus"
              className={cn('size-4', classNames?.quantityIcon)}
            />
          </Button>
        </div>
      ) : null}

      <Button
        type="button"
        variant={actionVariant}
        size={actionSize}
        className={classNames?.actionButton}
        aria-label={actionAriaLabel}
        disabled={isActionDisabled}
        onClick={onAction}
      >
        {actionLabel}
      </Button>
    </div>
  );
};
