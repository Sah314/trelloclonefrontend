"use client";
import React from "react";
//type Props = {}
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Loader from "./Loader/loader";
import { Form,FormField,FormControl,FormLabel, FormMessage,FormItem } from "./ui/form";
import { useForm } from "react-hook-form";
const SignupPage = () => {
  const [loading, setLoading] = React.useState(false);
const form = useForm({
  mode: "all",
  defaultValues: {
    email: "",
    password: "",
    cnfpassword: "",
  },
});
  const router  = useRouter(); 
   const responseMessage = (response :CredentialResponse) => {
    setLoading(true);
    const cred = response.credential
   // console.log(cred);
    axios
      .post(`${process.env.NEXT_PUBLIC_DEVELOPMENT_URL}/api/google`, {
        token: cred,
      })
      .then((res) => {
        console.log(res.data.token);
        if (res.status === 200) {
          localStorage.setItem("token", res.data.token);
          console.log("Login successful");
          router.push("/board/" + res.data.user.toString());
        }
      });
  }
   const errorMessage = () => {
     console.log("An error occurred during Google login.");
   };

   const onSubmit = ()=>{
    setLoading(true);
      console.log("Form submitted");
    }

    
  React.useEffect(() => {
    if (loading && router) {
      setLoading(false); // Hide the loader after the page is ready
    }
  }, [router]);

  return (
    <>
      {loading && (
        <>
          <Loader />
          <div className="fixed inset-0 w-full h-full bg-white/50 backdrop-blur-sm z-[999]"></div>
        </>
      )}
      <section
        className={`flex flex-col p-1 gap-1 justify-center relative top-[5rem] m-10 w-1/2 `}
      >
        <section className="flex flex-col border p-4 rounded-md gap-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 p-3"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                rules={{ required: "Password is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="password"
                        type="password"
                        {...field}
                        {...form.register("password")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cnfpassword"
                rules={{ required: "Confirm Password is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="confirm password"
                        type="password"
                        {...field}
                        {...form.register("cnfpassword")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Signup</Button>
            </form>
          </Form>
          <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
        </section>
      </section>
    </>
  );
};

export default SignupPage;
