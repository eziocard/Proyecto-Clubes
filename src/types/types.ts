export interface LoginResponse {
    token:string;
}

export interface UserInfo {
    id?:number;
    rut:string;
    name:string;
    lastname:string;
    role: 'superuser' | 'teacher' | 'team';
    email_verified_at: string | undefined,
    team_id: number | null,
    email:string,
    created_at?:string,
    updated_at?:string}

export interface User {

    id?: number;
  rut: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
  team_id?: number | null;
  role: 'superuser' | 'teacher' | 'team';
  
}