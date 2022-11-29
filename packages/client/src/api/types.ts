export type UserDTO = {
  id: number;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  avatar: string;
  phone: string;
  email: string;
  role?: string;
};

export type AuthDTO = {
  login: string;
  password: string;
  first_name?: string;
  second_name?: string;
  phone?: string;
  email?: string;
};

export type RequestError = {
  status: number,
  data: Record<string, any>,
};