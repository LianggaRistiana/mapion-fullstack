import { z } from 'zod';

export const locationSchema = z.object({
    title: z.string().min(2, 'Title must be at least 2 characters'),
    desc: z.string().min(5, 'Description must be at least 5 characters'),
    lat: z.number().min(-90, 'Latitude must be between -90 and 90').max(90, 'Latitude must be between -90 and 90'),
    lng: z.number().min(-180, 'Longitude must be between -180 and 180').max(180, 'Longitude must be between -180 and 180'),
});
