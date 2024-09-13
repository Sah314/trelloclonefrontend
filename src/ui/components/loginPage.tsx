"use client";
import React from "react";
//type Props = {}
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import axios from "axios";
import { useRouter } from "next/navigation";

//type Props = {}

const LoginPage = () => {
  const router = useRouter();
  const responseMessage = (response: CredentialResponse) => {
    const cred = response.credential;
    console.log(cred);
    axios
      .post("http://localhost:8081/api/google", { token: cred })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
        if (res.status === 200) {
          console.log("Login successful");
          router.push("/board/" + res.data.user.toString());
        }
      });
  };
  const errorMessage = () => {
    console.log("An error occurred during Google login.");
  };

  return (
    <section>
      <div className="flex flex-row h-10 bg-blue-500 justify-between">
        Login
        <div className="flex flex-row gap-4">
          <button className="text-white">Login</button>
          <button>Signup</button>
        </div>
      </div>
      <div className="flex items-center justify-center flex-col h-auto mt-28">
        <div className="flex flex-row justify-start w-[28rem] mb-2">
          <h1 className="text-blue-500 text-4xl font-bold py-4">Login</h1>
        </div>
        <div className="border-2 border-blue-500 h-auto w-[28rem] rounded-md flex flex-col items-center justify-center">
          <form className="flex flex-col gap-4 p-3 m-3 w-full">
            <input type="text" placeholder="Email" className="border-2 p-2" />
            <input
              type="password"
              placeholder="Password"
              className="border-2 p-2"
            />
            <button className="bg-blue-500 text-white p-2">Login</button>
          </form>
          <div className="m-1">
            Don`&apos;`t have an account?{" "}
            <a href="/" className="text-blue-500">
              Signup
            </a>
          </div>
          <button className=" text-white bg-blue-500 m-3 rounded-md p-2 w-[11rem]">
            {/* TODO: Implement Login with Google */}
            Login with <span className=" font-bold">Google</span>
            <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
