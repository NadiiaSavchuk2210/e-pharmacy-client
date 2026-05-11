import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all duration-fast ease-fast outline-none select-none focus-visible:border-accent focus-visible:ring-3 focus-visible:ring-accent/50 active:not-aria-[haspopup]:translate-y-[0.0625rem] disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-danger aria-invalid:ring-3 aria-invalid:ring-danger/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground hover:bg-button-primary-hover-bg focus-visible:bg-button-primary-hover-bg active:bg-button-primary-hover-bg',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 focus-visible:bg-secondary/80 active:bg-secondary/70 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground',
        ghost:
          'hover:bg-surface-muted hover:text-text focus-visible:bg-surface-muted focus-visible:text-text active:bg-surface-subtle aria-expanded:bg-surface-muted aria-expanded:text-text',
        destructive:
          'bg-button-danger-bg text-button-danger-text hover:bg-button-danger-hover-bg focus-visible:border-button-danger-hover-bg focus-visible:bg-button-danger-hover-bg focus-visible:ring-danger/20 active:bg-button-danger-hover-bg',
        delete:
          'rounded-[2.5rem] bg-button-delete-bg text-button-delete-text hover:bg-button-delete-hover-bg hover:text-button-delete-hover-text focus-visible:border-button-delete-hover-bg focus-visible:bg-button-delete-hover-bg focus-visible:text-button-delete-hover-text focus-visible:ring-danger/20 active:bg-button-delete-hover-bg active:text-button-delete-hover-text',
        link:
          'text-primary underline-offset-4 hover:underline focus-visible:underline active:text-button-primary-hover-bg active:underline',
        primary:
          'rounded-4xl bg-button-primary-bg text-button-primary-text hover:bg-button-primary-hover-bg focus-visible:bg-button-primary-hover-bg active:bg-button-primary-hover-bg',
        outline:
          'rounded-[1.88rem] border-button-outline-border bg-button-outline-bg text-button-outline-text hover:border-button-primary-bg hover:bg-button-primary-bg hover:text-button-primary-text focus-visible:border-button-primary-bg focus-visible:bg-button-primary-bg focus-visible:text-button-primary-text active:border-button-primary-hover-bg active:bg-button-primary-hover-bg active:text-button-primary-text',
        outlineInverse:
          'rounded-4xl border-button-outline-inverse-border bg-transparent text-button-outline-inverse-text hover:border-button-outline-inverse-hover-border hover:bg-button-outline-inverse-hover-bg hover:text-button-outline-inverse-hover-text focus-visible:border-button-outline-inverse-hover-border focus-visible:bg-button-outline-inverse-hover-bg focus-visible:text-button-outline-inverse-hover-text active:border-button-outline-inverse-hover-border active:bg-button-outline-inverse-hover-bg active:text-button-outline-inverse-hover-text',
        authRegister:
          'rounded-4xl border-link-auth-register-border bg-transparent font-normal text-link-auth-register-text hover:border-link-auth-register-hover-border hover:bg-link-auth-register-hover-bg hover:text-link-auth-register-hover-text focus-visible:border-link-auth-register-hover-border focus-visible:bg-link-auth-register-hover-bg focus-visible:text-link-auth-register-hover-text active:border-link-auth-register-hover-border active:bg-link-auth-register-hover-bg active:text-link-auth-register-hover-text',
        authLogin:
          'border-transparent bg-transparent font-normal text-link-auth-login-text underline decoration-current underline-offset-2 [text-decoration-skip-ink:none] hover:text-link-auth-login-hover-text hover:decoration-2 hover:underline-offset-4 focus-visible:text-link-auth-login-hover-text focus-visible:decoration-2 focus-visible:underline-offset-4 active:text-link-auth-login-hover-text active:decoration-2 active:underline-offset-4',
        authLogout:
          'rounded-4xl border-link-logout-border bg-transparent font-normal text-link-logout-text hover:border-link-logout-hover-border hover:bg-link-logout-hover-bg hover:text-link-logout-hover-text focus-visible:border-link-logout-hover-border focus-visible:bg-link-logout-hover-bg focus-visible:text-link-logout-hover-text active:border-link-logout-hover-border active:bg-link-logout-hover-bg active:text-link-logout-hover-text',
      },
      size: {
        default:
          'h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
        primary:
          'h-[2.75rem] w-[17.5rem] gap-1.5 px-space-112 py-space-13 text-14-08 leading-18',
        outline:
          'h-[2.125rem] w-[4.625rem] gap-1 px-[1.13rem] py-space-8 text-16 leading-18',
        pill: 'min-h-[2.875rem] min-w-[7.4375rem] gap-1.5 px-space-32 py-space-16 text-16 leading-1',
        delete: 'h-[2.0625rem] w-[5.5625rem] gap-1 px-space-12 py-space-8 text-14-08 leading-1',
        authRegister:
          'h-[2.875rem] w-[7.4375rem] gap-1 px-space-32 py-space-16 text-14-08 leading-1',
        authLogin: 'h-auto w-auto gap-1 p-0 text-14-08 leading-1',
        authLogout:
          'h-[2.875rem] w-[7.1875rem] gap-1 px-space-32 py-space-16 text-14-08 leading-1',
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),0.625rem)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),0.75rem)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: 'h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
        icon: 'size-8',
        'icon-xs':
          "size-6 rounded-[min(var(--radius-md),0.625rem)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        'icon-sm':
          'size-7 rounded-[min(var(--radius-md),0.75rem)] in-data-[slot=button-group]:rounded-lg',
        'icon-lg': 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Button({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : 'button';

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
