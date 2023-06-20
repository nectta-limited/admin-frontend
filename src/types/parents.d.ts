export interface ICreateParentRequest {
  name: string;
  email: string;
  phoneNumber: string;
  numberOfChildren: string;
  wards: IWard[];
  busNumber: string;
}

export interface IWard {
  name: string;
  grade: string;
}
