import { defineCollection, z } from "astro:content";

const pages = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    experience: z
      .array(
        z.object({
          years: z.string(),
          company: z.string(),
          role: z.string(),
          description: z.string(),
          stack: z.string(),
        }),
      )
      .optional(),
    ask: z
      .array(
        z.object({
          question: z.string(),
          answer: z.string(),
        }),
      )
      .optional(),
    projects: z
      .array(
        z.object({
          name: z.string(),
          description: z.string(),
          stack: z.string(),
          image: z.string().optional(),
        }),
      )
      .optional(),
    writing: z
      .array(
        z.object({
          title: z.string(),
          description: z.string(),
          source: z.string().optional(),
          date: z.string().optional(),
          url: z.string().optional(),
          image: z.string().optional(),
        }),
      )
      .optional(),
    beliefs: z
      .array(
        z.object({
          heading: z.string(),
          points: z.array(z.string()),
        }),
      )
      .optional(),
  }),
});

export const collections = { pages };
