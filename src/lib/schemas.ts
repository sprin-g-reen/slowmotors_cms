import { z } from 'zod';

export const tourSchema = z.object({
  title_en: z.string().min(1, 'English title is required'),
  title_de: z.string().min(1, 'German title is required'),
  description_en: z.string().min(1, 'English description is required'),
  description_de: z.string().min(1, 'German description is required'),
  startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date",
  }),
  endDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date",
  }),
  difficulty: z.enum(['Easy', 'Medium', 'Hard', 'Expert']),
  priceEur: z.number().min(0),
  priceInr: z.number().min(0),
  status: z.enum(['Available', 'Last Seats', 'Sold Out']),
  slug: z.string().min(1),
});

export type TourFormData = z.infer<typeof tourSchema>;
