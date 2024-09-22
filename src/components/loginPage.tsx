  "use client";

  import React from "react";
  import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
  import axios from "axios";
  import { useForm } from "react-hook-form";
  import { useRouter } from "next/navigation";
  import {
    Form,
    FormField,
    FormLabel,
    FormControl,
    FormItem,
    // FormDescription,
    FormMessage,
  } from "./ui/form";
  import {Button} from "./ui/button";
  import {Input} from "./ui/input";
import Link from "next/link";
import Loader from "./Loader/loader";


  const LoginPage = () => {
      const [loading, setLoading] = React.useState(false);

    const form = useForm(
      {
        mode: "all",
        defaultValues: {
          email: "",
          password: "",
        },
        
      }
    );
    const router = useRouter();
    const responseMessage = (response: CredentialResponse) => {
      setLoading(true);
      const cred = response.credential;
      //console.log(cred);
      axios
        .post(`${process.env.NEXT_PUBLIC_DEVELOPMENT_URL}/api/google`, {
          token: cred,
        })
        .then((res) => {
          console.log("Token:", res.data.result.token);
          console.log("userid:", res.data.result.user.id);
          localStorage.setItem("token", res.data.result.token);
          if (res.status === 200) {
            console.log("Login successful");
            router.push("/board/" + res.data.result.user.id.toString());
          }
        });
    };
    const errorMessage = () => {
      console.log("An error occurred during Google login.");
    };
    const onSubmit = async()=>{
      setLoading(true);
      console.log("Form submitted");
      const formValues = form.getValues();
      console.log(formValues);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_DEVELOPMENT_URL}/api/login`,
        {
          email: formValues.email,
          password: formValues.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log(response);
      console.log(response.status);
    }

    React.useEffect(() => { 
      console.log(
        "Token:",
        `${process.env.NEXT_PUBLIC_DEVELOPMENT_URL}/api/login`
      );
      if (localStorage.getItem("token")) {
      
        const getResponse = async () => {
            const response = await axios.post(
              `${process.env.NEXT_PUBLIC_DEVELOPMENT_URL}/api/login`,{},
              {
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );
            console.log(response);
                 if (response.status === 200) {
                   console.log("Login successful");
                  //  if (response.data.user.role === "admin") {
                  //    router.push("/admin");
                  //  }
                   router.push("/board/" + response.data.result.user.id);
                 }
        }

        getResponse().then(() => {
          console.log("Token verified");
          }).catch((error) => {
            console.error("Error:",error);
          }
        );
  }
}
, []);

    return (
      <>
        {loading && (
          <>
            <Loader />
            <div className="fixed inset-0 w-full h-full bg-white/50 backdrop-blur-sm z-[999]"></div>
          </>
        )}
        <section className="flex flex-col p-1 gap-1 justify-center relative top-[5rem] m-10 w-1/2">
          <h1 className="text-3xl font-bold mb-3">Welcome Back</h1>
          <section className="flex flex-col border p-4 rounded-md gap-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 p-3"
              >
                <FormField
                  control={form.control}
                  name="email"
                  rules={{
                    required: "Email field is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Entered value does not match email format",
                    },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="email" {...field} required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  rules={{
                    required: "Password is required",
                    // pattern:{
                    // value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                    // message: "Password must contain at least 8 characters, one uppercase, one lowercase, and one number",}
                  }}
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
                <Button type="submit">Login</Button>
              </form>
            </Form>
            <div>
              Don&apos;t have an account?
              <Button asChild variant={"link"}>
                <Link href="/auth/signup">sign in</Link>
              </Button>
            </div>
            <hr className="mb-4" />
            <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
          </section>
        </section>
      </>
    );
  };

  export default LoginPage;
