export interface LoginData {
  user: string;
  password: string;
}

export interface LoginResponse {
  user: string;
  token: string;
}

export interface LogoutData {
  user: string;
  token: string;
}