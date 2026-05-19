import type { CustomerReview } from '@/entities/customer-review';

const fallbackReviewImages: Record<string, string> = {
  'Maria Tkachuk': '/images/reviews/maria-tkachuk.png',
  'Sergey Rybachok': '/images/reviews/sergey-rybachok.png',
  'Natalia Chatuk': '/images/reviews/natalia-chatuk.png',
};

export const getReviewImage = ({ image, name }: CustomerReview) =>
  image ?? fallbackReviewImages[name] ?? '/images/reviews/maria-tkachuk.png';
