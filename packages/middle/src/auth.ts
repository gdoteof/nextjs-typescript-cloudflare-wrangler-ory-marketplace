import { FrontendApi, Configuration, Session } from "@ory/client";
import fetchAdapter from "@haverstack/axios-fetch-adapter";

export async function authenticatedSession(request: Request, env: Env): Promise<Session | false> {
    try {
        const userSession = await getUserSession(request, env);
        return new Promise((resolve) => resolve(userSession));
    } catch (error) {
        console.error("Error during authentication:", error);
        return new Promise((reject) => reject(false));
    }
}

export async function authorizedSession(request: Request, env: Env): Promise<Session | false> {
    // For now, we'll consider successful authentication as successful authorization.
    // This can be expanded later with more complex authorization logic.
    return authenticatedSession(request, env);
}

export async function getUserSession(request: Request, env: Env): Promise<Session> {
    const ory = new FrontendApi(
        new Configuration({
            basePath: env.ORY_SDK_URL,
            baseOptions: {
                adapter: fetchAdapter,
            },
        })
    );

    console.log("env.ORY_SDK_URL", env.ORY_SDK_URL);

    const cookies = request.headers.get("Cookie") || undefined;
    console.log("cookies", cookies);
    const resp = await ory.toSession({ cookie: cookies });
    if (!resp || resp.status === 401) {
        console.error("Failed to retrieve user session. Status:", resp.status);
        throw new Error('Unauthorized');
    }
    return resp.data;
}
