'use client'
import { useEffect, useState } from "react";
import { Configuration, FrontendApi, Session, Identity } from "@ory/client";

const basePath = process.env.NEXT_PUBLIC_ORY_SDK_URL;

const ory = new FrontendApi(
    new Configuration({
        basePath: basePath,
        baseOptions: {
            withCredentials: true,
        },
    })
);

export const useClientUserSession = () => {
    const [isClient, setIsClient] = useState(false);

    const [session, setSession] = useState<Session | undefined>();
    const [logoutUrl, setLogoutUrl] = useState<string>("");
    const [settingsUrl, setSettingsUrl] = useState<string>("");
    const [userName, setUsername] = useState<string | undefined>();

    const loginUrl = `${basePath}/ui/login`;

    useEffect(() => {
        setIsClient(true); // Set isClient to true when component mounts
    }, []);

    useEffect(() => {
        if (isClient) { 
            ory
                .toSession()
                .then(({ data }) => {
                    setSession(data);
                    if (!data.identity) {
                        return;
                    }
                    setUsername(data.identity.traits.username);
                    ory.createBrowserSettingsFlow().then(({ data }) => {
                        setSettingsUrl(data.request_url);
                    });
                    ory.createBrowserLogoutFlow().then(({ data }) => {
                        setLogoutUrl(data.logout_url);
                    });
                })
                .catch(() => {
                    setUsername('anonymous coward');
                });
        }
    }, [isClient]);

    return { session, logoutUrl, settingsUrl, userName, loginUrl };
};
