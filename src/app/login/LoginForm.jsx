'use client'

import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { FaGoogle, FaGithub, FaFacebook } from 'react-icons/fa';

const LoginForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signIn, googleLogin } = useAuth();

    const onSubmit = async data => {
        // console.log(data)
        const { email, password } = data;
        const toastId = toast.loading("Loading...")
        try {
            const user = await signIn(email, password)
            // console.log(user)
            toast.dismiss(toastId);
            toast.success(`${user.displayName ? user.displayName : user.email } Signed in Successfully!`)
        } catch (error) {
            toast.dismiss(toastId);
            toast.error(error.message || 'Failed to Login')
        }
    }

    const handleGoogleLogin = async () => {
        const toastId = toast.loading("Loading...")
        try {
            const user = await googleLogin();
            toast.dismiss(toastId);
            toast.success(`${user} Signed in Successfully!`)

        } catch (error) {
            toast.dismiss(toastId);
            toast.error(error.message || 'Failed to Login')
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input
                        type="email"
                        placeholder="email"
                        id="email"
                        name="email"
                        autoComplete="email"
                        className="input input-bordered"
                        {...register("email", {
                            required: true,
                            pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/,
                        })}
                    />
                    {
                        errors.email && (
                            <span className="text-red-500 mt-1">
                                Please Enter a Valid Email
                            </span>
                        )
                    }
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input
                        type="password"
                        placeholder="password"
                        className="input input-bordered"
                        name="password"
                        autoComplete="new-password"
                        {...register("password", {
                            required: true,
                            minLength: 6
                        })}
                    />
                    {
                        errors.password && (
                            <span className="text-red-500 mt-1">
                                Please Enter a Password
                            </span>
                        )
                    }

                </div>
                <div className="form-control mt-6">
                    <button className="btn btn-primary" type="submit">Login</button>
                </div>

                <div className="flex justify-between">
                    <label className="label">
                        <p className="label-text-alt link link-hover">
                            Don&apos;t have a account?
                            <Link className="text-blue-500 underline ml-1" href="/signup">Signup</Link>
                        </p>
                    </label>
                    <label className="label">
                        <Link href="#" className="label-text-alt link link-hover">Forgot password?</Link>
                    </label>
                </div>

                <div className="divider">Social Login</div>
                <div className="flex justify-between items-center text-3xl text-center px-10">
                    <FaGoogle />
                    <FaGithub />
                    <FaFacebook />

                </div>


            </div>
        </form>
    );
};

export default LoginForm;