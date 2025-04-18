import * as z from "zod";
export const SignupValidation = z.object({
  name: z.string().min(2, { message: "too short" }),
  username: z.string().min(2, { message: "too short" }),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});

export const SigninValidation = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});

export const PostValidation = z.object({
  caption: z
    .string({
      required_error: "Caption is required",
    })
    .min(1, "Caption is required")
    .max(2000, "Caption must be at most 2000 characters"),

  file: z
    .array(z.instanceof(File))
    .min(1, { message: "Please upload at least one file" }),

  location: z.string().max(100, "Location must be at most 100 characters"),
  tags: z.string(),
});

export const ProfileValidation = z.object({
  file: z.custom<File[]>(),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  username: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email(),
  bio: z.string(),
});
