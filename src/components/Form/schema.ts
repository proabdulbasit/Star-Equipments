import * as z from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(1, 'Please enter your name'),
  email: z.string().email('Please enter a valid email'),
  message: z.string().min(1, 'Please enter a message'),
  lastname: z.string().min(1, 'Please enter your last name'),
  phone: z.string().min(1, 'Please enter a message'),
});
