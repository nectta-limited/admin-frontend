export interface ICreateBusRequest {
  busNumber: number;
  busType: string;
  busColor: string;
}

export interface IUpdateBusRequest {
  id: string | number;
  body: ICreateBusRequest;
}

export interface IBus {
  id: number;
  busNumber: string;
  busType: string;
  busColor: string;
  driver: string;
  numStudents: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface IGetBusesResponse {
  status: boolean;
  data: IBus[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalRecords: number;
  };
}

export interface IGetBusesRequestParams {
  page?: number;
  limit?: number;
}
