export type AuthFormFieldName<TFormValues extends object> = Extract<
  keyof TFormValues,
  string
>;

export type AuthValidationErrors<TFormValues extends object> = Partial<
  Record<AuthFormFieldName<TFormValues> | 'form', string>
>;

export type AuthTokenResponse = {
  token: string;
  tokenType: 'Bearer';
  expiresIn: number;
};

export type AuthSessionResponse<TUser extends object> = AuthTokenResponse & {
  user: TUser;
};

export type AuthErrorResponse<TErrorDetails extends object> = {
  statusCode?: number;
  message?: string | string[];
  error?: string;
  errors?: TErrorDetails;
};
