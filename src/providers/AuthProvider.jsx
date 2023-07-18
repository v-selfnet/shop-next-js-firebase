import AuthContext from '@/context/AuthContext';
import auth, { googleProvider } from '@/firebase/firebase.auth';
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile
} from 'firebase/auth';
import { useEffect, useState } from 'react';


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false);

    // create new user
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    //signin
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    //update profile
    const profileUpdate = async (updateUser = {}) => {
        setLoading(true)
        await updateProfile(auth.currentUser, updateUser);
        setUser(preUser => ({ ...preUser, ...updateUser }))
    }

    // google login
    const googleLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    //logout
    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }

    // obsurve user state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, cUser => {
            setUser(cUser);
            setLoading(false)
        });
        return () => unsubscribe;
    }, [])
    const authInfo = {
        user,
        createUser,
        signIn,
        profileUpdate,
        googleLogin,
        logOut


    }
    return <AuthContext.Provider value={authInfo}>
        {children}
    </AuthContext.Provider>
};

export default AuthProvider;