import React, { createContext, useContext,  useState } from "react";
import type { MyContextType } from "./model";
import Cookies from "js-cookie";

const MyContext = createContext<MyContextType | undefined>(undefined);


// eslint-disable-next-line react-refresh/only-export-components
export const useMyContext = (): MyContextType => {
  const context = useContext(MyContext);

  if (!context) {
    throw new Error("useMyContext must be used within a ContextProvider");
  }
  return context;
};




export const ContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  
  
  const [currentRouter, setCurrentRouter] = useState(() => {
    return !!Cookies.get("token") || localStorage.getItem("isAuth") === 'true';
  });

  
  const myContextValue: MyContextType = {
    router: currentRouter,
    setRouter: (value) => {
      setCurrentRouter(value);

      localStorage.setItem("isAuth", JSON.stringify(value));

      if (!value) {
        Cookies.remove("token");
      }
    },
  };
  return (
    <MyContext.Provider value={myContextValue}>{children}</MyContext.Provider>
  );
};
