import { z } from "zod";

export const signInFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

export const signUpFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" }),
  confirmPassword: z.string(),
});

export const forgotPasswordFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export const resetPasswordFormSchema = z.object({
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" }),
  confirmPassword: z.string(),
});

export const createEventSchema = z.object({
  eventName: z
    .string()
    .min(3, { message: "Nama event minimal 3 karakter" })
    .max(100, { message: "Nama event maksimal 100 karakter" }),
  eventDescription: z
    .string()
    .min(10, { message: "Deskripsi minimal 10 karakter" }),
  eventDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Tanggal event tidak valid (format ISO 8601 diharapkan)",
  }),
  eventCertificatePrefixCode: z
    .string()
    .refine((val) => val.endsWith("/") && !val.startsWith("/"), {
      message: "Prefix harus diakhiri dengan '/' dan tidak diawali dengan '/'",
    }),
  eventCertificateSuffixCode: z
    .number()
    .int({ message: "Suffix harus berupa bilangan bulat" })
    .min(1, { message: "Suffix minimal bernilai 1" }),
  eventOrganizer: z
    .string()
    .min(2, { message: "Penyelenggara minimal 2 karakter" }),
  eventTheme: z.enum(["Technology Design", "Formal Design", "Custom Design"], {
    errorMap: () => ({ message: "Tema event tidak valid" }),
  }),
  eventStakeholderName: z
    .string()
    .min(2, { message: "Nama stakeholder minimal 2 karakter" }),
  eventStakeholderPosition: z
    .string()
    .min(2, { message: "Posisi stakeholder minimal 2 karakter" }),
});
