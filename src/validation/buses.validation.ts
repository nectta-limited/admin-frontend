import * as Yup from "yup";

export const createBusSchema = Yup.object({
  busNumber: Yup.string().trim().required("Bus number is required"),
  busColor: Yup.string().trim().required("Bus color is required"),
  busType: Yup.string().trim().required("Bus type is required"),
});
