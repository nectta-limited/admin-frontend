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

export interface IParent {
  id: number;
  parentId: string;
  name: string;
  email: string;
  phoneNumber: string;
  numberOfChildren: number;
  wards: string;
  busNumber: string;
  status: string;
  profileImage: null;
  createdAt: string;
  updatedAt: string;
}

export interface IGetParentsResponse {
  status: boolean;
  data: IParent[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalRecords: number;
  };
}

export interface IGetParentsRequestParams {
  page?: number;
  limit?: number;
}
