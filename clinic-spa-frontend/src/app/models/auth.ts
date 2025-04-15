
export interface User {
  id: string;
  username: string;
  email: string;
  roles: string[];
}

export interface Auth {
  accessToken: string;
  refreshToken?: string;
  username: string;
  email: string;
  roles: string[];
  role: string;
  userId: string;
}
