// middle/src/auth.ts

import { FrontendApi, Configuration, Session } from "@ory/client";
import fetchAdapter from "@haverstack/axios-fetch-adapter";

export async function authenticate(request: Request, env: Env): Promise<boolean> {
    try {
        const userSession = await getUserSession(request, env);
        return !!userSession;
    } catch (error) {
        return false;
    }
}

export async function authorize(request: Request, env: Env): Promise<boolean> {
    // For now, we'll consider successful authentication as successful authorization.
    // This can be expanded later with more complex authorization logic.
    return authenticate(request, env);
}

async function getUserSession(request: Request, env: Env): Promise<Session> {
    const ory = new FrontendApi(
        new Configuration({
            basePath: env.ORY_SDK_URL,
            baseOptions: {
                adapter: fetchAdapter
            },
        })
    );

    const cookies = request.headers.get("Cookie") || undefined;
    const resp = await ory.toSession({ cookie: cookies });
    if (!resp || resp.status === 401) {
        throw new Error('Unauthorized');
    }
    return resp.data;
}
