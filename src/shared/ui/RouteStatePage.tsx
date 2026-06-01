import { cn } from '@/lib/utils';

import type { ReactNode } from 'react';

type RouteStatePageProps = {
  eyebrow: string;
  title: string;
  description: string;
  actions: ReactNode;
  tone?: 'default' | 'danger';
};

const toneClassNames = {
  default: {
    badge: 'border-accent/30 bg-accent-soft text-brand-700 dark:text-text',
    code: 'text-brand-700 dark:text-text',
    panel: 'border-card-border',
  },
  danger: {
    badge: 'border-danger/30 bg-danger-soft text-danger',
    code: 'text-danger',
    panel: 'border-danger/30',
  },
};

const RouteStatePage = ({
  eyebrow,
  title,
  description,
  actions,
  tone = 'default',
}: RouteStatePageProps) => {
  const classes = toneClassNames[tone];

  return (
    <div className="bg-surface-muted">
      <section className="container | flex min-h-[calc(100vh-12rem)] items-center justify-center py-space-60 md:py-space-120 lg:[--container-max:760px]">
        <div
          className={cn(
            'w-full rounded-[27px] border bg-surface px-space-20 py-space-44 text-center shadow-sm md:px-space-48 md:py-space-60',
            classes.panel,
          )}
        >
          <p
            className={cn(
              'mx-auto mb-space-24 inline-flex min-h-[33px] items-center rounded-full border px-space-16 text-14 font-semibold leading-space-18',
              classes.badge,
            )}
          >
            {eyebrow}
          </p>

          <h1
            className={cn(
              'mb-space-16 text-48 font-semibold leading-space-50 md:text-74 md:leading-space-74',
              classes.code,
            )}
          >
            {title}
          </h1>

          <p className="mx-auto mb-space-32 max-w-[34rem] text-14 leading-space-20 text-text-muted md:text-16 md:leading-space-25">
            {description}
          </p>

          <div className="flex flex-col items-center justify-center gap-space-12 sm:flex-row">
            {actions}
          </div>
        </div>
      </section>
    </div>
  );
};

export default RouteStatePage;
