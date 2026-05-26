import {
  getMobileMenuButtonClassName,
  getMobileMenuButtonLineClassName,
} from './MobileMenuButton.styles';

import type { HeaderInteractiveTone } from '../../constants';

type MobileMenuButtonProps = {
  isOpen: boolean;
  controlsId?: string;
  hasPopup?: boolean;
  tone?: HeaderInteractiveTone;
  onClick: () => void;
};

export const MobileMenuButton = ({
  isOpen,
  controlsId,
  hasPopup = false,
  tone = 'inverse',
  onClick,
}: MobileMenuButtonProps) => {
  return (
    <button
      type="button"
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={controlsId ? isOpen : undefined}
      aria-haspopup={hasPopup ? 'dialog' : undefined}
      aria-controls={controlsId}
      data-state={isOpen ? 'open' : 'closed'}
      className={getMobileMenuButtonClassName({ isOpen, tone })}
      onClick={onClick}
    >
      <span
        className={getMobileMenuButtonLineClassName({
          isOpen,
          line: 'top',
          tone,
        })}
      />
      <span
        className={getMobileMenuButtonLineClassName({
          isOpen,
          line: 'middle',
          tone,
        })}
      />
      <span
        className={getMobileMenuButtonLineClassName({
          isOpen,
          line: 'bottom',
          tone,
        })}
      />
    </button>
  );
};
