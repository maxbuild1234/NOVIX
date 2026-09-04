import { z } from "zod";
import { budgetRanges } from "@/content/plans";

/**
 * One schema, used by the form in the browser and by the route handler on
 * the server. The messages are the ones the visitor reads, so they are
 * written in the site's voice rather than as validation jargon.
 */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "We need a name to reply to.")
    .max(80, "That is longer than we can store — first and last is plenty."),

  email: z
    .string()
    .trim()
    .min(1, "We need an email address to reply to.")
    .pipe(z.email("That does not look like an email address. Check for a typo?")),

  company: z
    .string()
    .trim()
    .max(120, "That is longer than we can store.")
    .optional()
    .or(z.literal("")),

  budget: z.enum(budgetRanges, {
    message: "Pick the range that fits. A rough answer is fine.",
  }),

  message: z
    .string()
    .trim()
    .min(20, "Tell us a little more — twenty characters at least.")
    .max(4000, "That is over 4,000 characters. Send us the short version and we will ask."),

  /** Hidden field. Real people leave it empty; bots fill it in. */
  website: z.string().max(0).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
