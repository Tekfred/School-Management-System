import { createContext, useContext, useMemo, useState } from "react";
const UIContext = createContext(null);
export function UIProvider({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const value = useMemo(
    () => ({
      isSidebarOpen,
      toggleSidebar: () => setSidebarOpen((open) => !open),
    }),
    [isSidebarOpen],
  );
  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}
export const useUI = () => useContext(UIContext);
