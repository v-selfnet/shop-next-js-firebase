import React from 'react';
import { toast } from 'react-hot-toast';
import { FaFacebook } from 'react-icons/fa';

const FaceBookLogin = () => {
    const handleFacebookLogin = () => {
        toast.success('Comming Soon...')
    }
    return (
        <div>
        <FaFacebook className="btn btn-ghost btn-circle btn-sm" onClick={handleFacebookLogin} />
    </div>
    );
};

export default FaceBookLogin;