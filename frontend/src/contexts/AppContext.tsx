import React, { useContext, useState } from "react";
import Toast from "../components/Toast";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";

type ToastMeassage = {
    message: string,
    type: "SUCCESS" | "ERROR";
}

type AppContext = {
    showToast:(toastMessage:ToastMeassage) => void;
    isLoggedIn: boolean
}

const AppContext = React.createContext<AppContext | undefined> (undefined);

export  const AppContextProvider = ({children}: {children: React.ReactNode}) =>{
    const [toast, setToast]=useState<ToastMeassage |undefined>(undefined);
    const { isError } = useQuery("validateToken",apiClient.validateToken, {
        retry:false,
    });
    return (
        <AppContext.Provider value={{
            showToast: (toastMessage) => {
                setToast(toastMessage);
            },
            isLoggedIn: !isError,
            }}>
             {toast && (<Toast 
              message={toast.message}
              type= {toast.type} 
              onClose={()=>{setToast(undefined)}}
              />)}
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    const context = useContext(AppContext);
    return context as AppContext;
}