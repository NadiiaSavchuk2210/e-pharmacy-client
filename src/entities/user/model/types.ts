export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
};

export type UserInfo = Pick<User, 'email' | 'id' | 'name'>;
