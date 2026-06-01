const relativeTimeFormatter = new Intl.RelativeTimeFormat('en', {
  numeric: 'auto',
});

const relativeTimeUnits = [
  { unit: 'year', seconds: 60 * 60 * 24 * 365 },
  { unit: 'month', seconds: 60 * 60 * 24 * 30 },
  { unit: 'week', seconds: 60 * 60 * 24 * 7 },
  { unit: 'day', seconds: 60 * 60 * 24 },
  { unit: 'hour', seconds: 60 * 60 },
  { unit: 'minute', seconds: 60 },
] as const;

export const formatProductReviewDate = (createdAt: string) => {
  const createdDate = new Date(createdAt);

  if (Number.isNaN(createdDate.getTime())) {
    return '';
  }

  const elapsedSeconds = Math.round(
    (createdDate.getTime() - Date.now()) / 1000,
  );
  const unitConfig = relativeTimeUnits.find(
    ({ seconds }) => Math.abs(elapsedSeconds) >= seconds,
  );

  if (!unitConfig) {
    return 'just now';
  }

  return relativeTimeFormatter.format(
    Math.round(elapsedSeconds / unitConfig.seconds),
    unitConfig.unit,
  );
};
