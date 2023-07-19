import LoginForm from "./LoginForm";

export const metadata = {
    title: 'Shop Online | Login Page',
    description: 'eCommerce Site',
}

const LoginPage = () => {
    return (
        <div className="hero">
            <div className="hero-content">
                <div className="text-center">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                </div>
                <div className="card shadow-2xl w-96 bg-base-300">
                    <LoginForm></LoginForm>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;