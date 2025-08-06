import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, Mail, User, Lock, ArrowRight, User2, PhoneCall, LocationEdit } from "lucide-react";
import { motion } from "framer-motion";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
// import { useAuth } from "../context/AuthContext";
import { LOGIN, PRIVACY, TERMES } from "../router/Router";

// Zod schema
const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters").max(50),
  email: z.string().email("Invalid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  confirmPassword: z.string(),
  // avatar: z.any().optional(),
  phone: z.string().min(6, "Phone number must be at least 6 characters").optional(),
  address: z.string().min(5, "Address must be at least 5 characters").optional(),
  terms: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions" }),
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const SignUpPage = () => {
  const [step, setStep] = useState(1);
  const [error, setError] = useState(null);
  const [avatar, setAvatar] = useState(null)
  const navigate = useNavigate();
  // const { register: registerUser } = useAuth();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      // avatar: null,
      phone: "",
      address: "",
      terms: false,
    },
  });

  const nextStep = async () => {
    let fieldsToValidate = [];
    if (step === 1) {
      fieldsToValidate = ['fullName', 'email', 'password', 'confirmPassword'];
    } else if (step === 2) {
      fieldsToValidate = ['phone', 'address']; // avatar is optional
    }

    const isValid = await form.trigger(fieldsToValidate);
    if (isValid) {
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => setStep((prev) => prev - 1);


  const onSubmit = async (values) => {
    setError(null);
    try {
      const formData = new FormData();
      formData.append("name", values.fullName);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("password_confirmation", values.confirmPassword);
      formData.append("role", "client");
      if (values.phone) formData.append("phone", values.phone);
      if (values.address) formData.append("address", values.address);
      // if (values.avatar instanceof File) {
      //   formData.append("avatar", values.avatar);
      // }
      formData.append('avatar',avatar)

      // await registerUser(formData);
      navigate(LOGIN);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Registration failed");
      console.error("Registration error:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center mt-20 justify-center p-4">
      <motion.div className="w-full max-w-md bg-background p-8 rounded-xl shadow-lg border" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold mb-4 text-center">Create an Account</h1>
        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-center">{error}</div>}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} encType="multipart/form-data" className="space-y-6">
            {/* Step 1: Basic Info */}
            {step === 1 && (
              <>
                <FormField control={form.control} name="fullName" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input {...field} placeholder="John Doe" className='w-full pl-7' />
                        <User2 className="absolute top-1/2 -translate-y-1/2 left-1.5 text-gray-700" size={16} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input type="email" {...field} placeholder="john@example.com" className='w-full pl-7' />
                        <Mail className="absolute top-1/2 -translate-y-1/2 left-1.5 text-gray-700" size={16} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="password" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput {...field} placeholder="********" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="confirmPassword" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <PasswordInput {...field} placeholder="********" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </>
            )}

            {/* Step 2: Additional Info */}
            {step === 2 && (
              <>
                <FormField control={form.control} name="avatar" render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Avatar (Optional)</FormLabel>
                      <FormControl>
                        <Input 
                          type="file" 
                          accept="image/*" 
                          onChange={(e) => setAvatar(e.target.files?.[0])}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }} />

                <FormField control={form.control} name="phone" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input type="tel" {...field} placeholder="+212..." className='pl-7 w-full' />
                        <PhoneCall className="absolute top-1/2 -translate-y-1/2 left-1.5 text-gray-700" size={16}/>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="address" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input {...field} placeholder="123 Main Street" className='w-full pl-7'/>
                        <LocationEdit className="absolute top-1/2 -translate-y-1/2 left-1.5 text-gray-700" size={16}/>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </>
            )}

            {/* Step 3: Terms */}
            {step === 3 && (
              <FormField control={form.control} name="terms" render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 p-2">
                  <FormControl>
                    <Checkbox 
                      checked={field.value} 
                      onCheckedChange={field.onChange} 
                    />
                  </FormControl>
                  <FormLabel className="text-sm leading-tight">
                    I agree to the <Link to={TERMES} className="text-primary underline">Terms</Link> and <Link to={PRIVACY} className="text-primary underline">Privacy</Link>.
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )} />
              
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              {step > 1 && (
                <Button type="button" variant="outline" onClick={prevStep}>
                  Back
                </Button>
              )}
              
              {step < 3 ? (
                <Button type="button" onClick={nextStep}>
                  Next
                </Button>
              ) : (
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Registering...
                    </>
                  ) : (
                    <>
                      Sign Up <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              )}
            </div>

            <div className="text-center text-sm text-muted-foreground mt-4">
              Already have an account? <Link to={LOGIN} className="text-primary underline">Log in</Link>
            </div>
          </form>
        </Form>
      </motion.div>
    </div>
  );
};