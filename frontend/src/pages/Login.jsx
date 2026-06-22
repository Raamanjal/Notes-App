import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router";
import { LockIcon, MailIcon, NotebookPenIcon } from "lucide-react";
import api from '../lib/axios';

const Login = () => {
    const[email,setEmail] = useState("");
    const[password,setPassword]= useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(token){
            navigate("/");
        }
    },[navigate]);

    const handleLogin = async (e)=>{
        e.preventDefault();
        try{
            const res=await api.post("/auth/login",{email, password});
            const token = res.data.token;
            
            localStorage.setItem("token", token);
            navigate("/");
        } catch(err){
            setError("Invalid email or password");
            }
    }
  return (
    <div className="min-h-screen bg-base-200 px-4 py-10">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-lg border border-base-content/10 bg-base-100 shadow-xl lg:grid-cols-[0.95fr_1.05fr]">
          <div className="hidden bg-primary p-10 text-primary-content lg:flex lg:flex-col lg:justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary-content/15 p-3">
                <NotebookPenIcon className="size-7" />
              </div>
              <span className="font-mono text-2xl font-bold tracking-tight">
                ThinkBoard
              </span>
            </div>

            <div className="space-y-5">
              <p className="max-w-sm text-4xl font-bold leading-tight">
                Your notes, organized the moment inspiration shows up.
              </p>
              <p className="max-w-md text-primary-content/80">
                Sign in to pick up your ideas right where you left them.
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-10">
            <div className="mx-auto w-full max-w-md">
              <div className="mb-8 text-center sm:text-left">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary lg:hidden">
                  <NotebookPenIcon className="size-4" />
                  ThinkBoard
                </div>
                <h1 className="text-3xl font-bold tracking-tight">
                  Welcome back
                </h1>
                <p className="mt-2 text-base-content/60">
                  Login to continue managing your notes.
                </p>
              </div>

              <form className="space-y-5" onSubmit={handleLogin}>
                <label className="form-control">
                  <span className="label-text mb-2 font-medium">Email</span>
                  <div className="relative">
                    <MailIcon className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-base-content/40" />
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input input-bordered w-full pl-12"
                    />
                  </div>
                </label>

                <label className="form-control">
                  <span className="label-text mb-2 font-medium">Password</span>
                  <div className="relative">
                    <LockIcon className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-base-content/40" />
                    <input
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="input input-bordered w-full pl-12"
                    />
                  </div>
                </label>

                {error && (
                  <div className="alert alert-error py-3 text-sm">{error}</div>
                )}

                <button type="submit" className="btn btn-primary w-full">
                  Login
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-base-content/60">
                New to ThinkBoard?{" "}
                <Link to="/register" className="font-semibold text-primary hover:underline">
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
