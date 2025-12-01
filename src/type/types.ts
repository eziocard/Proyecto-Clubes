
export type User = {
  id: number;
  rut: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
  team_id?: number | null;
  role: 'superuser' | 'teacher' | 'team_admin';
  created_at?: string;
  updated_at?: string;
}

export type LoginResponse = {
  user: {
    id: number;
    rut: string;
    name: string;
    lastname: string;
    email: string;
    team_id: number | null;
    role: string;
    created_at: string;
    updated_at: string;
  };
  token: string;
};

export type LoginResponseError = {
  message: string;
};

export type AccessTokenResponse = {
  access_token: string;
  expires_in: number;
};
 
export type AccessTokenError = {
  message: string;
};

