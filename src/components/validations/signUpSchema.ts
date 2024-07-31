import {z} from "zod"



const signUpSchema = z.object({
  firstName: z.string().min(1, {message:"First Name is required"}),
  lastName: z.string().min(1, {message:"Last Name is required"}),
  email: z.string().min(1, {message:"Email adress is required"}).email(),
  password: z
  .string()
  .min(8, {message:"Password must be a 8 characters longs"})
  .regex(/.*[!@#$%^&*()_+{}|[\]\\:";'<>?,./].*/, {
    message:"Password must contain at least one special character"
  }),
  confirmPassword: z 
  .string()
  .min(1, {message:"Confirm Password is required"}),
})
.refine((input) => input.password === input.confirmPassword, {
  message:"Password and Confirm Password must be the same",
  path: ["confirmPassword"]

})

type signUpType = z.infer<typeof signUpSchema>


export {signUpSchema, type signUpType}