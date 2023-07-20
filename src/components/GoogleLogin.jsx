
import useAuth from '@/hooks/useAuth';
import createJWT from '@/utils/createJWT';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { FaGoogle } from 'react-icons/fa';

const GoogleLogin = () => {
    const { googleLogin } = useAuth();

    const search = useSearchParams();
    const from = search.get('redirectUrl') || '/';
    const { replace } = useRouter();

    const handleGoogleLogin = async () => {
        const toastId = toast.loading("Loading...")
        try {
            const { user } = await googleLogin();
            console.log(user)
            await createJWT({ email: user.email })
            toast.dismiss(toastId);
            toast.success(`${user.displayName ? user.displayName : user.email} Signed in Successfully!`)
            replace(from);

        } catch (error) {
            toast.dismiss(toastId);
            toast.error(error.message || 'Failed to Login')
        }
    }
    return (
        <div>
            <FaGoogle className="btn btn-ghost btn-circle btn-sm" onClick={handleGoogleLogin} />
        </div>
    );
};

export default GoogleLogin;