export type ApiCustomerReview = {
  _id?: string;
  id?: string;
  avatar?: string;
  image?: string;
  imageUrl?: string;
  name: string;
  photo?: string;
  testimonial: string;
  userPhoto?: string;
};

export type CustomerReview = Omit<
  ApiCustomerReview,
  '_id' | 'avatar' | 'id' | 'image' | 'imageUrl' | 'photo' | 'userPhoto'
> & {
  id: string;
  image?: string;
};
