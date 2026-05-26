export type HeaderTone = 'default' | 'brand' | 'inverse' | 'sticky';
export type HeaderLogoTone = Extract<
  HeaderTone,
  'default' | 'inverse' | 'sticky'
>;
export type HeaderInteractiveTone = Exclude<HeaderTone, 'default'>;
