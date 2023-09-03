
import { FrontendApi, Configuration } from "@ory/client";
import fetchAdapter from "@haverstack/axios-fetch-adapter";

interface Env {
    ORY_SDK_URL: string;
}

export async function handleAuth(request: Request, env: Env): Promise<Response> {
    if (request.method === 'OPTIONS') {
        return new Response('', { status: 200 });
    }
    
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
        return new Response('Unauthorized', { status: 401 });
    }
    
    return new Response('', { status: 200 });
}
