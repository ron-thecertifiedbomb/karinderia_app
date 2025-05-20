import { z } from "zod";


const nameRegex = /^[A-Za-z]+$/;

export const registrationSchema = z
  .object({
     firstName: z
      .string()
      .min(1, "First name is required")
      .regex(nameRegex, "First name must contain only letters"),
    
    lastName: z
      .string()
      .min(1, "Last name is required")
      .regex(nameRegex, "Last name must contain only letters"),
    userName: z
      .string()
      .min(1, "Username is required")
      .regex(
        /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])/,
        "Username must contain at least one uppercase letter and one special character"
      ),
    mobile: z.number().min(1, "Mobile number is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    gender: z.string(),
    birthday: z.date(),
    dateCreated: z.string(),
    timeCreated: z.string(),
    isLoggedIn: z.boolean(),
    lastLoggedIn: z.null(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });
