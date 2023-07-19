'use client'

import FaceBookLogin from '@/components/FaceBookLogin';
import GitHubLogin from '@/components/GitHubLogin';
import GoogleLogin from '@/components/GoogleLogin';
import useAuth from '@/hooks/useAuth';
import Link from 'next/link';

import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { FaFacebook, FaGithub } from 'react-icons/fa';

const SignupForm = () => {
    const { register, handleSubmit, formState: { errors }, getValues, setValue } = useForm();
    const { createUser, profileUpdate } = useAuth();

    // console.log(process.env.NEXT_PUBLIC_IMAGE_UPLOAD);

    const uploadImage = async event => {
        let imgbbupload = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_UPLOAD}`
        const formData = new FormData();
        if (!event.target.files[0]) return;
        formData.append('image', event.target.files[0]);
        const toastId = toast.loading('Image Uploading...')
        try {
            const res = await fetch(imgbbupload, {
                method: "POST",
                body: formData
            });
            if(!res.ok) throw new Error("Failed to Upload Image")
            const data = await res.json();
            console.log(data)
            toast.dismiss(toastId);
            toast.success("Image Upload Successfully!");
            setValue('photo', data.data.url);
        } catch (error) {
            toast.error("Image not uploaded!");
            toast.dismiss(toastId);
        }
    }

    const onSubmit = async data => {
        const { name, email, password, photo } = data;
        console.log(data)
        const toastId = toast.loading("Loading...")
        try {
            await createUser(email, password);
            await profileUpdate({ displayname: name, photoURL: photo });
            toast.dismiss(toastId);
            toast.success(`[ ${name ? name : email} ] Signed in Successfully!`);
        } catch (error) {
            toast.dismiss(toastId);
            toast.error(error.message || 'Failed to Login');
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input
                        type="text"
                        placeholder="name"
                        id="name"
                        name="name"
                        className="input input-bordered"
                        {...register("name", { required: true })}
                    />
                    {
                        errors.name && (
                            <span className="text-red-500 mt-1">
                                Please Enter Your Name
                            </span>
                        )
                    }
                </div>
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
                                {errors.password.message || "Please Enter a Password"}
                            </span>
                        )
                    }


                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Confirm Password</span>
                    </label>
                    <input
                        type="password"
                        placeholder="confirm password"
                        className="input input-bordered"
                        name="confirmPassword"
                        autoComplete="new-password"
                        {...register("confirmPassword", {
                            required: true,
                            minLength: 6,
                            validate: value => value === getValues('password') || 'password Not Match!'
                        })}
                    />
                    {
                        errors.confirmPassword && (
                            <span className="text-red-500 mt-1">
                                {errors.confirmPassword.message || "Please Enter Confirm Password"}
                            </span>
                        )
                    }

                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Upload Photo</span>
                    </label>
                    <input
                        type="file"
                        placeholder="upload photo"
                        name="photo"
                        onChange={uploadImage}
                        className="file-input file-input-bordered file-input-primary w-full"
                    />
                    {
                        errors.photo && (
                            <span className="text-red-500 mt-1">
                                Please Enter Your Photo
                            </span>
                        )
                    }
                </div>

                <div className="form-control mt-6">
                    <button className="btn btn-primary" type="submit">Signup</button>
                </div>


                <div className='flex justify-between'>
                    <label className="label">
                        <p className="label-text-alt link link-hover">
                            Already have a account?
                            <Link className="text-blue-500 underline ml-1" href="/login">Signin</Link>
                        </p>
                    </label>
                    <label className="label">
                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
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

export default SignupForm;