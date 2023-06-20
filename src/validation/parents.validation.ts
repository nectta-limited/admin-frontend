import * as Yup from "yup";

export const createParentSchema = Yup.object({
  name: Yup.string().trim().required("Name is required"),
  email: Yup.string().trim().email("Invalid email").required("Email is required"),
  phoneNumber: Yup.string().trim().required("Phone number is required"),
  busNumber: Yup.object().required("Bus number is required").nullable(),
  numberOfChildren: Yup.object().required("Number of children is required").nullable(),
});

export const createWardSchema = Yup.object({
  name: Yup.string().trim().required("Name is required"),
  grade: Yup.string().trim().required("Grade is required"),
});
