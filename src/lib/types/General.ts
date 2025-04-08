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
    .min(3, { message: "Event name must be at least 3 characters" })
    .max(100, { message: "Event name maximum 100 characters" }),
  eventDescription: z
    .string()
    .min(10, { message: "Description at least 10 characters" }),
  eventDate: z.string({
    message: "The event date is invalid",
  }),
  eventCertificatePrefixCode: z
    .string()
    .min(1, { message: "Prefix must be at least 1" })
    .refine((val) => val.endsWith("/") && !val.startsWith("/"), {
      message: "Prefixes must end with ‘/’ and not begin with '/'",
    }),
  eventCertificateSuffixCode: z
    .number({ message: "Suffix must be a number" })
    .refine((val) => val !== null, { message: "Suffix cannot be empty" }),
  eventOrganizer: z
    .string()
    .min(2, { message: "Organizer Name of at least 2 characters" }),
  eventTheme: z.string().min(1, { message: "Event theme must not be empty" }),
  eventTemplate: z.enum(
    [
      "DEFAULTDESIGN",
      "TECHNOLOGYDESIGN_1",
      "TECHNOLOGYDESIGN_2",
      "TECHNOLOGYDESIGN_3",
      "FORMALDESIGN_1",
      "FORMALDESIGN_2",
      "FORMALDESIGN_3",
    ],
    {
      errorMap: () => ({ message: "Design template must not be empty" }),
    },
  ),
  eventStakeholderName: z
    .string()
    .min(2, { message: "Stakeholder name at least 2 characters" }),
  eventStakeholderPosition: z
    .string()
    .min(2, { message: "Position name of stakeholder at least 2 characters" }),
});

export const updateEventSchema = z
  .object({
    eventName: z
      .string()
      .min(3, { message: "Event name must be at least 3 characters" })
      .max(100, { message: "Event name maximum 100 characters" })
      .optional(),
    description: z
      .string()
      .min(10, { message: "Description at least 10 characters" })
      .optional(),
    activityAt: z.string({ message: "The event date is invalid" }).optional(),
    prefixCode: z
      .string()
      .min(1, { message: "Prefix must be at least 1" })
      .refine((val) => val.endsWith("/") && !val.startsWith("/"), {
        message: "Prefixes must end with ‘/’ and not begin with '/'",
      })
      .optional(),
    suffixCode: z
      .number({ message: "Suffix must be a number" })
      .refine((val) => val !== null, { message: "Suffix cannot be empty" })
      .optional(),
    organizer: z
      .string()
      .min(2, { message: "Organizer Name of at least 2 characters" })
      .optional(),
    eventTheme: z
      .string()
      .min(1, { message: "Event theme must not be empty" })
      .optional(),
    eventTemplate: z
      .enum(
        [
          "DEFAULTDESIGN",
          "TECHNOLOGYDESIGN_1",
          "TECHNOLOGYDESIGN_2",
          "TECHNOLOGYDESIGN_3",
          "FORMALDESIGN_1",
          "FORMALDESIGN_2",
          "FORMALDESIGN_3",
        ],
        {
          errorMap: () => ({ message: "Design template must not be empty" }),
        },
      )
      .optional(),
  })
  .strict(); // <- menolak field asing
