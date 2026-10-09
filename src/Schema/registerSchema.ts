import * as zod from "zod";

export let registerSchema = zod.object({
    name: zod.string().nonempty({ message: "Name is required" }).min(2, { message: "Name must be at least 2 characters" }),
    email: zod.string().nonempty({ message: "Email is required" }).email({ message: "Invalid email address" }),
    password: zod.string().nonempty({ message: "Password is required" }).min(6, { message: "Password must be at least 6 characters" }),
    rePassword: zod.string().nonempty({ message: " rePassword is required" }).min(6, { message: "Confirm Password must be at least 6 characters" }),
    phone: zod.string().nonempty({ message: "Phone number is required" }).regex(/^01[0125][0-9]{8}$/, { message: "Invalid phone number" }),
}).refine((data) => {
    if (data.password === data.rePassword) {
        return true;
    } else {
        return false;
    }
}, {
    path: ["rePassword"],
    message: "Passwords do not match"})