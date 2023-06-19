export interface IUser {
  status: boolean;
  data: {
    id: number;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
  token: string;
}
