"use client";


import {
  loginWithEmailPassword,
  signupWithEmailPassword,
} from "@/Firebase/firebaseAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

type AuthFormType = {
  type: string;
  msg: string;
};

const AuthForm = ({ type, msg }: AuthFormType) => {
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const route = useRouter();
 

  const handleSignup = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (name.trim() === "" || email.trim() === "" || password.trim() === "") {
      return toast.error("Please fill all the fields");
    }
   signupWithEmailPassword(email, password, name);
    resetInput();
    route.push("/");
  };
  const handleLogin = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (email.trim() === "" || password.trim() === "") {
      return toast.error("Please fill all the fields");
    }
    loginWithEmailPassword(email, password);
    resetInput();
    route.push("/");
  };

  const resetInput = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <div className="flex flex-col justify-center p-5">
        <div className="card bg-base-100 w-full max-w-[430px] shrink-0 shadow-2xl mx-auto mt-16 border-slate-100 border-2">
          <h1 className="text-center text-neutral font-bold text-2xl mt-5">Welcome Back</h1>
          <p className="text-center mt-1 text-neutral">{msg}</p>
          <form className="card-body">
            {type === "signup" && (
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-neutral font-semibold text-[16px]">
                    Name
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  className="input input-bordered w-full"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}

            <div className="form-control ">
              <label className="label">
                <span className="label-text text-neutral font-semibold text-[15px]">
                  Email
                </span>
              </label>
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-neutral font-semibold text-[15px]">
                  Password
                </span>
              </label>
              <input
                type="Password"
                placeholder="password"
                className="input input-bordered w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-control mt-6">
              {type === "signup" ? (
                <>
                  <button
                    className="btn btn-primary text-white text-[15px]"
                    onClick={handleSignup}
                  >
                    Sign up
                  </button>
                  <p className="text-center mt-5 text-neutral">
                    Already have an account?{" "}
                    <Link
                      href={"./signin"}
                      className="font-bold text-neutral hover:underline"
                    >
                      Sign In
                    </Link>
                  </p>
                </>
              ) : (
                <>
                  <button
                    className="btn btn-primary text-white text-[16px]"
                    onClick={handleLogin}
                  >
                    Sign in
                  </button>
                  <p className="text-center mt-5 text-neutral">
                    Don&apos;t have an account yet?{" "}
                    <Link
                      href={"./signup"}
                      className="font-bold text-neutral hover:underline"
                    >
                      Sign Up
                    </Link>
                  </p>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AuthForm;
