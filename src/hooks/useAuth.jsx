import AuthContext from "@/context/AuthContext";
import { useContext } from "react";


const useAuth = () => {
    const auth = useContext(AuthContext);
    
    const isUser = typeof window !== "undefine"

    if(!isUser && !auth) return {};

    if(!auth){
        throw new Error(
            "You must wrap your application with AuthProvider to use the useAuth"
        )
    }
    return auth;
};

export default useAuth;