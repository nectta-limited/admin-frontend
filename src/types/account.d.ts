export interface IRegisterUserResponse {
  status: boolean;
  data: {
    createdAt: { val: string };
    updatedAt: { val: string };
    id: number;
    password: string;
    email: string;
  };
  token: string;
}

export interface ILoginUserRequest {
  email: string;
  password: string;
}

export interface IChangePasswordRequest {
  email: string;
  oldPassword: string;
  newPassword: string;
}

export interface IGetDataCountResponse {
  status: boolean;
  data: {
    buses: number;
    parents: number;
    drivers: number;
  };
}
