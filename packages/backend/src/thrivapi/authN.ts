
import { FrontendApi, Configuration, Session, RelationshipApi, MetadataApi } from "@ory/client";
import { handleAuthZ } from "./authZ";
import fetchAdapter from "@haverstack/axios-fetch-adapter";


export async function handleAuth(request: Request, env: Env): Promise<Response> {
    return handleAuthN(request, env);
}
export async function handleAuthN(request: Request, env: Env): Promise<Response> {
    if (request.method === 'OPTIONS') {
        return new Response('', { status: 200 });
    }

    try {
        const userSession = await getUserSession(request, env);
        return handleAuthZ(request, env, userSession);
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 401 });
    }
}

export async function getUserSession(request: Request, env: Env): Promise<Session> {
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