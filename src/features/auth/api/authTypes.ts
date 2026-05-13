export type AuthValidationErrors<TValues extends object> = Partial<
  Record<keyof TValues | 'form', string>
>;

export type AuthResponse<TUser, TErrors extends object> = {
  message?: string;
  error?: string;
  user?: TUser;
  token?: string;
  accessToken?: string;
  refreshToken?: string;
  tokenType?: 'Bearer';
  expiresIn?: number;
  errors?: TErrors;
};
