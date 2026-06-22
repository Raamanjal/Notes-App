import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router';
import { LockIcon, MailIcon, NotebookPenIcon, UserIcon } from "lucide-react";
import api from '../lib/axios';

const Register = () => {
  const [name,setName] = useState("");
  const[email,setEmail] = useState("");
  const[password,setPassword]= useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(()=>{
    const token=localStorage.getItem("token");
    if(token){
    navigate("/");
    }
  },[navigate])
  
  const handleSubmit = async (e)=>{
    e.preventDefault();
    try{
        const res= await api.post("/auth/register",{name,email,password});
        const token = res.data.token;
        localStorage.setItem("token",token);
        navigate("/");
    } catch(err){
      setError(
      err.response?.data?.message || "Registration failed"
      );  
    }
  }
  return (
    <div className="min-h-screen bg-base-200 px-4 py-10">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-lg border border-base-content/10 bg-base-100 shadow-xl lg:grid-cols-[1.05fr_0.95fr]">
          <div className="p-6 sm:p-10">
            <div className="mx-auto w-full max-w-md">
              <div className="mb-8 text-center sm:text-left">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary lg:hidden">
                  <NotebookPenIcon className="size-4" />
                  ThinkBoard
                </div>
                <h1 className="text-3xl font-bold tracking-tight">
                  Create your account
                </h1>
                <p className="mt-2 text-base-content/60">
                  Start capturing ideas, tasks, and quick thoughts in one place.
                </p>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <label className="form-control">
                  <span className="label-text mb-2 font-medium">Name</span>
                  <div className="relative">
                    <UserIcon className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-base-content/40" />
                    <input
                      type="text"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="input input-bordered w-full pl-12"
                    />
                  </div>
                </label>

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
                      placeholder="Create a password"
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
                  Register
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-base-content/60">
                Already have an account?{" "}
                <Link to="/login" className="font-semibold text-primary hover:underline">
                  Login
                </Link>
              </p>
            </div>
          </div>

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
                Build a quieter place for your loudest ideas.
              </p>
              <p className="max-w-md text-primary-content/80">
                Create your workspace and keep every note ready when you need it.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
