import { defineCollection, z } from 'astro:content';

const casosCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    order: z.number(),
    link: z.string().url().optional(),
    desc: z.array(z.string()),
    tech: z.array(z.string()),
    image: z.string().optional()
  })
});

export const collections = {
  casos: casosCollection
};
