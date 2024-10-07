import { z } from "zod";

export const promocodeSchema = z.object({
    couponCode: z.string().nonempty("couponCode is required"),
});
