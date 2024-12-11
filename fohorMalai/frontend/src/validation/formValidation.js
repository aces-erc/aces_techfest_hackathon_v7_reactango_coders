import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const loginSchema = yup.object().shape({
    username: yup
      .string()
      .required("Username is required")
      .min(8, "Username must be at least 3 characters long")
      .max(69, "Username must be at most 20 characters long"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 6 characters long")
      .max(20, "Password must be at most 20 characters long"),
  });

  export const signUpSchema = yup.object().shape({
    username: yup.string()
    .required("Username is required"),

    email: yup.string()
    .required("Email is required")
    .email("Email is invalid"),

    password: yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must not exceed 20 characters"),

    confirmPassword: yup.string()
    .oneOf([yup.ref("password"), null], "Confirm Password does not match with Password"),

    Agreed: yup.bool()
    .oneOf([true], "You must agree with our terms and conditions to continue")
});