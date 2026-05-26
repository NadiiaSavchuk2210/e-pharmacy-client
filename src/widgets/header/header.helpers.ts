import type { HeaderInteractiveTone, HeaderLogoTone } from './constants';

type HeaderToneState = {
  isHeaderGlass: boolean;
  isHomePage: boolean;
};

export const getHeaderTone = ({
  isHeaderGlass,
  isHomePage,
}: HeaderToneState): HeaderLogoTone => {
  if (isHeaderGlass) return 'sticky';
  if (isHomePage) return 'inverse';

  return 'default';
};

export const getHeaderInteractiveTone = (
  tone: HeaderLogoTone,
): HeaderInteractiveTone => {
  return tone === 'default' ? 'brand' : tone;
};
