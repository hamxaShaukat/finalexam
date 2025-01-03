'use client';
import React, { useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { signIn } from "next-auth/react"; 
import Swal from "sweetalert2";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault(); 

    if (!email || !password) {
      Swal.fire({
        title: "All fields are required",
        icon: "error",
        showConfirmButton: true,
      });
      return;
    }

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        Swal.fire({
          title: "Sign-in Failed",
          text: result.error,
          icon: "error",
          showConfirmButton: true,
        });
      } else {
        Swal.fire({
          title: "Sign-in Successful",
          icon: "success",
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
        setTimeout(() => {
          window.location.href = "/tasklist"; 
        }, 2000);
      }
    } catch (error) {
      Swal.fire({
        title: "Unexpected Error",
        text: "Something went wrong. Please try again.",
        icon: "error",
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className="min-h-screen bg-black py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-teal-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-black shadow-2xl sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold text-center mb-6 text-white">
                Sign in to
              </h1>
              <div className="text-center font-black text-3xl text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-green-300 to-teal-400 cursor-pointer hover:bg-gradient-to-r hover:from-teal-400 hover:via-green-300 hover:to-green-500 transition-colors duration-300">
                Hamu Task Manager
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-400 sm:text-lg sm:leading-7">
                <form className="flex flex-col gap-6" onSubmit={handleSignIn}>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium"
                    >
                      Email:
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium"
                    >
                      Password:
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      required
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full py-3 mt-4 bg-gradient-to-r from-green-500 to-teal-500 text-white text-lg rounded-md hover:bg-gradient-to-r hover:from-teal-500 hover:to-green-500 transition-colors duration-300 ease-in-out focus:ring-4 focus:ring-blue-300 focus:outline-none"
                  >
                    Sign in
                  </Button>
                </form>
              </div>
            </div>
            <p className="text-white mt-4">
              Don&apos;t have an account?{" "}
              <Link
                href="/regis"
                className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-green-300 to-teal-400 cursor-pointer hover:bg-gradient-to-r hover:from-teal-400 hover:via-green-300 hover:to-green-500 transition-colors duration-300"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
