export interface ICreateDriverRequest {
  driverName: string;
  driverEmail: string;
  driverPhoneNumber: string;
  busNumber: string;
}

export interface IUpdateDriverRequest {
  id: number;
  body: ICreateDriverRequest;
}

export interface IDriver {
  id: number;
  driverId: string;
  driverName: string;
  driverEmail: string;
  driverPhoneNumber: string;
  busNumber: string;
  status: string;
  profileImage: null;
  createdAt: string;
  updatedAt: string;
}

export interface IGetDriversResponse {
  status: boolean;
  data: IDriver[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalRecords: number;
  };
}

export interface IGetDriversRequestParams {
  page?: number;
  limit?: number;
}

export interface ISearchDriversRequestParams extends IGetDriversRequestParams {
  query?: string;
}
