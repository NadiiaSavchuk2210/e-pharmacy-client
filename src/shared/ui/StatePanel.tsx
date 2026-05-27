import { cn } from '@/lib/utils';

import type { ComponentPropsWithoutRef } from 'react';

type StatePanelTone = 'default' | 'danger';
type StatePanelSpacing = 'none' | 'sm' | 'md';

type StatePanelProps = ComponentPropsWithoutRef<'div'> & {
  spacing?: StatePanelSpacing;
  tone?: StatePanelTone;
};

const toneClassNames: Record<StatePanelTone, string> = {
  default: 'border-card-border',
  danger: 'border-danger/30',
};

const spacingClassNames: Record<StatePanelSpacing, string> = {
  none: '',
  sm: 'flex flex-col gap-space-16',
  md: 'flex flex-col gap-space-18',
};

const StatePanel = ({
  children,
  className,
  spacing = 'none',
  tone = 'default',
  ...props
}: StatePanelProps) => {
  return (
    <div
      className={cn(
        'rounded-[20px] border bg-surface p-space-24',
        toneClassNames[tone],
        spacingClassNames[spacing],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default StatePanel;
