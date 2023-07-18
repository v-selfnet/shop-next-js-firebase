'use client'

import ThemeProvider from './ThemeProvider';
import AuthProvider from './AuthProvider';

const Providers = ({ children }) => {
    return (
        <ThemeProvider>
            <AuthProvider>
                {children}
            </AuthProvider>
        </ThemeProvider>
    );
};

export default Providers;