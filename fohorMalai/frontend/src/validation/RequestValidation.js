import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";


export const requestValidationSchema = yup.object().shape({
  wasteType: yup.string().required("Waste Type is required"),
  wasteWeight: yup
    .number()
    .typeError("Waste Weight must be a number")
    .required("Waste Weight is required")
    .min(1, "Waste Weight must be at least 1 kg"),
  urgency: yup.string().required("Urgency is required"),
  location: yup.string().required("Location is required"),
});