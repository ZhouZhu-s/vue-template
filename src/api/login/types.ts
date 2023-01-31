export namespace Login {
  export interface LoginType {
    name: string;
  }

  export interface PostLoginParams {
    username: string;
    password: string;
    rememberMe: boolean;
  }
}
