import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage} from "@/components/ui/form"
import { PasswordInput } from "@/components/ui/password-input";
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from 'react'
import { Mail, Phone, User2 } from "lucide-react"



const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters").max(50),
  email: z.string().email("Invalid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  phone: z.string().min(6, "Phone number must be at least 6 characters").optional(),
  avatar: z.any().optional(),

})


const AddAssistant = ({ children }) => {

  const form = useForm({
    resolver:zodResolver(formSchema),
    defaultValues: {
      fullName:'',
      email: '',
      password:'',
      phone:'',
      role: "assistant",
      avatar: null
    }
  })

  const [error, setError] = useState(null)

  const onSubmit = (values) => {
    setError(null)
    console.log(values);
  }


  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Assistant</DialogTitle>
          <DialogDescription>
            Fill in the details to add a new assistant.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
        <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)} encType="multipart/form-data">
        <FormField control={form.control} name='fullName' render={({field}) =>(
          <FormItem>
            <FormLabel>Full Name:</FormLabel>
            <FormControl>
<div className="relative">
            <Input {...field}   placeholder="Assistant Full-Name" className="w-full pl-7" />
            <User2 className="absolute top-1/2 -translate-y-1/2 left-1.5 text-gray-700" size={16} />
          </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
          <FormField control={form.control} name='email' render={({field}) =>(
            <FormItem>
              <FormLabel>Email:</FormLabel>
              <FormControl>
                  <div className="relative">
                    <Input {...field} placeholder='E-mail Address'  className='w-full pl-7'/>
                    <Mail className="absolute top-1/2 -translate-y-1/2 left-1.5 text-gray-700" size={16} />
                  </div>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )} />
         <FormField control={form.control} name='password' render={({field}) =>(
          <FormItem>
            <FormLabel>Password:</FormLabel>
            <FormControl>
             <PasswordInput {...field} placeholder='*******' />
            </FormControl>
            <FormMessage />
          </FormItem>
         )} />
         <FormField control={form.control} name="phone" render={({field}) =>(
          <FormItem>
            <FormLabel>Phone Number:</FormLabel>
            <FormControl>
              <div className="relative">
                <Input {...field} placeholder="Assistant phone number" className="w-full pl-7"/>
               <Phone className="absolute top-1/2 -translate-y-1/2 left-1.5 text-gray-700" size={16} />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
         )} />
         <FormField control={form.control} name='avatar' render={({field}) =>(
          <FormItem>
            <FormLabel>Assistant Image:</FormLabel>
            <FormControl>
              <div className="relative">
                <Input {...field} className="w-full pl-7" type='file' accept='image/*' />
              </div>
            </FormControl>
          </FormItem>
         )} />
          <div className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Add Assistant</Button>
          </div>
        </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default AddAssistant