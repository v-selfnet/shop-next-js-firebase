
// import ThemeContext from "@/context/ThemeContext"; // this is for seperate create context file
import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext(null);

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    let storedTheme = localStorage.getItem("theme");
    if (!storedTheme || !(storedTheme === "dark" || storedTheme === "light")) {
      storedTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    setTheme(storedTheme);
  }, []);

  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    const onChange = (e) => {
      const colorScheme = e.matches ? "dark" : "light";
      setTheme(colorScheme);
    };

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", onChange);

    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", onChange);
    };
  }, []);

  const toggleTheme = () => {
    setTheme((preTheme) => {
      const currentTheme = preTheme === "dark" ? "light" : "dark";
      localStorage.setItem("theme", currentTheme);
      return currentTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;