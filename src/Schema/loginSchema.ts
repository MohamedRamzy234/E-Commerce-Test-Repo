import * as zod from "zod";

export let loginSchema = zod.object({
   
    email: zod.string().nonempty({ message: "Email is required" }).email({ message: "Invalid email address" }),
    password: zod.string().nonempty({ message: "Password is required" }).min(6, { message: "Password must be at least 6 characters" }),
    
})