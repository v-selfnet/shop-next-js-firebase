
import useAuth from '@/hooks/useAuth';
import { toast } from 'react-hot-toast';
import { FaGoogle } from 'react-icons/fa';

const GoogleLogin = () => {
    const {googleLogin} = useAuth();

    const handleGoogleLogin = async () => {
        const toastId = toast.loading("Loading...")
        try {
            const user = await googleLogin();
            console.log(user)
            toast.dismiss(toastId);
            toast.success(`${user.displayName ? user.displayName : user.email} Signed in Successfully!`)

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