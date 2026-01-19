import { z } from 'zod';

export const tourSchema = z.object({
  title_en: z.string().min(1, 'English title is required'),
  title_de: z.string().min(1, 'German title is required'),
  description_en: z.string().min(1, 'English description is required'),
  description_de: z.string().min(1, 'German description is required'),
  difficulty: z.enum(['Easy', 'Medium', 'Hard', 'Expert']),
  priceEur: z.number().min(0),
  priceInr: z.number().min(0),
  slug: z.string().min(1),
  // Dates are handled separately in the UI for now, or need a more complex schema
});

export type TourFormData = z.infer<typeof tourSchema>;
