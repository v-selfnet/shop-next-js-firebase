import React from 'react';
import SignupForm from './SignupForm';

const SignupPage = () => {
    
    return (
        <div className="hero">
            <div className="hero-content">
                <div className="text-center">
                    <h1 className="text-5xl font-bold">Register now!</h1>
                </div>
                <div className="card shadow-2xl w-96 bg-base-300">
                   <SignupForm></SignupForm>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;