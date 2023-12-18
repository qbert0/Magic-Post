import * as z from 'zod'

export const OrderValidation = z.object({
    receiverName: z.string().min(1),
    address: z.object({
        city: z.string(),
        district:z.string(),
        ward: z.string(),
    }),
    phone: z.string(),
    description: z.string(),
    typeOrder:z.string(),
    specialService: z.string(),
    // email : z.string(),
})