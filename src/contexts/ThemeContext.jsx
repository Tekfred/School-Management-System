import { createContext, useContext, useEffect, useMemo, useState } from "react";
const ThemeContext = createContext(null);
export function ThemeProvider({ children }) {
  const [isDark, setDark] = useState(
    () => localStorage.getItem("theme") === "dark",
  );
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);
  const value = useMemo(
    () => ({ isDark, toggleTheme: () => setDark((dark) => !dark) }),
    [isDark],
  );
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
export const useTheme = () => useContext(ThemeContext);
