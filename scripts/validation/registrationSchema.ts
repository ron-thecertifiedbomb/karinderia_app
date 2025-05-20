import { z } from "zod";

export const registrationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  userName: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  gender: z.string().min(1, "Gender is required"),
  mobile: z
    .string()
    .regex(/^\d{10,}$/, "Mobile number must be at least 10 digits"),
  email: z.string().email("Invalid email address"),
  birthday: z.date(),
  dateCreated: z.string(),
  timeCreated: z.string(),
  isLoggedIn: z.boolean(),
  lastLoggedIn: z.null(),
});
