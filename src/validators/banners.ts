import { z } from "zod";

export const CreateBannerValidator =  z.object({
    title: z.string().min(1, {
        message: "Title is required"
    }),
    link: z.string().min(1, {
        message: "Link is required"
    }),
    imgUrl: z.string().url({
        message: "Image must be a valid URL"
    }),
})

export const UpdateBannerValidator =  z.object({
    title: z.string().min(1, {
        message: "Title is required"
    }).optional(),
    link: z.string().min(1, {
        message: "Link is required"
    }).optional(),
    imgUrl: z.string().url({
        message: "Image must be a valid URL"
    }).optional(),
})

export const BannerIdValidator = z.object({
    bannerId: z.string().min(1, {
        message: "Banner ID is required"
    })
})