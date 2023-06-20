import * as Yup from "yup";

export const createDriverSchema = Yup.object({
  driverName: Yup.string().trim().required("Driver name is required"),
  driverEmail: Yup.string().trim().email("Invalid email").required("Driver email is required"),
  driverPhoneNumber: Yup.string().trim().required("Driver phone number is required"),
  busNumber: Yup.object().required("Bus number is required").nullable(),
});
