import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    hook: z.string(),
    status: z.enum(['active', 'beta', 'in-development', 'idea', 'paused']),
    lastUpdated: z.string(),
    techStack: z.array(z.string()),
    github: z.string().url().optional(),
    demo: z.string().url().optional(),
    order: z.number(),
  }),
});

export const collections = { projects };
