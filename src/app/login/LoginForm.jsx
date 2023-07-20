'use client'

import FaceBookLogin from "@/components/FaceBookLogin";
import GitHubLogin from "@/components/GitHubLogin";
import GoogleLogin from "@/components/GoogleLogin";
import useAuth from "@/hooks/useAuth";
import createJWT from "@/utils/createJWT";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { startTransition } from "react";

import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const LoginForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signIn } = useAuth();

    const search = useSearchParams();
    const from = search.get('redirectUrl') || '/';
    const { replace, refresh } = useRouter();

    const onSubmit = async data => {
        // console.log(data)
        const { email, password } = data;
        const toastId = toast.loading("Loading...")
        try {
            const { user } = await signIn(email, password)
            // console.log(user)
            await createJWT({ email });
            startTransition(() => {
                refresh()
                replace(from);
                toast.dismiss(toastId);
                toast.success(`${user.displayName ? user.displayName : user.email} Signed in Successfully!`)
            })
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
                <div className="flex justify-between items-center text-center px-10">
                    <GoogleLogin></GoogleLogin>
                    <GitHubLogin></GitHubLogin>
                    <FaceBookLogin></FaceBookLogin>

                </div>


            </div>
        </form>
    );
};

export default LoginForm;