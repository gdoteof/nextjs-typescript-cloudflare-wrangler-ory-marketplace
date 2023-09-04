'use client'
import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { Configuration, FrontendApi, Session, Identity } from "@ory/client";
import { debounce } from '../_utils/debounce';

const basePath = process.env.NEXT_PUBLIC_ORY_SDK_URL;

const ory = new FrontendApi(
    new Configuration({
        basePath: basePath,
        baseOptions: {
            withCredentials: true,
        },
    })
);
// <SessionContext.Provider value={{session, setSession, logoutUrl, settingsUrl, userName, loginUrl }}>
type SessionContextType = {
    session: Session | undefined;
    setSession: React.Dispatch<React.SetStateAction<Session | undefined>>;
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    console.log("top of SessionProvider");
    const [session, _setSession] = useState<Session | undefined>();
    const setSession = debounce(_setSession, 1000 * 60 * 5); // 5 minutes
    console.log("about to return from SessionProvider");

    return (
        <SessionContext.Provider value={{session, setSession}}>
            {children}
        </SessionContext.Provider>
    );
};

export const useSession = () => {
    const context = useContext(SessionContext);
    if (context === undefined) {
        throw new Error('useSession must be used within a SessionProvider');
    }
    return context;
};
