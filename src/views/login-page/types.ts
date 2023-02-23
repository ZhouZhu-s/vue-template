export interface LoginInfo {
  username: string;
  password: string;
}

export type LoginForm = LoginInfo & {
  verificationCode: string;
};
