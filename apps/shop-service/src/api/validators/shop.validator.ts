import { z } from "zod";

export const getShopDetailsValidator = z.object({
    params: z.object({
        shopId: z.string().uuid(),
    })
});

export type GetShopDetailsCommand = z.infer<typeof getShopDetailsValidator>;