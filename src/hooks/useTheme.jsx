// import ThemeContext from "@/context/ThemeContext"; // this is for seperate create context file
import { ThemeContext } from "@/providers/ThemeProvider";
import { useContext } from "react";

const useTheme = () => {
    // const theme = useContext(ThemeContext);  // this is for seperate create context file
    const theme = useContext(ThemeContext)
    const isClient = typeof window !== "undefine";
    if (!isClient && !theme) return {}
    if (!theme) {
        throw new Error(
            "You must wrap your application with ThemeProvider to use the useTheme"
        );
    }
    return theme;
};

export default useTheme;