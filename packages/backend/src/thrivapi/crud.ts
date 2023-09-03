import { Result } from "../types";
import { path2KV } from "../utils/path2KV";
import { v4 as uuidv4 } from 'uuid';

interface ResourceType<T> {
    namespace: KVNamespace;
    assertType: (obj: any) => obj is T;
    validate: (data: any) => boolean;
}

export async function handleCRUD(request: Request, env: Env): Promise<Response> {
    console.log("handleCRUD0", request.url);
    const url = new URL(request.url);
    console.log("handleCRUD1", request.url);
    const path = url.pathname.split("/").filter(Boolean);
    const resourceAttempt = path2KV(path, env);
    console.log("handleCRUD2", request.url);

    if (resourceAttempt.kind === "failure") {
    console.log("handleMAP FAILURE", request.url);
        return new Response(JSON.stringify({ error: resourceAttempt.error }), { status: 404 });
    }
    console.log("handleCRUD3", request.url);

    const { namespace, assertType } = resourceAttempt.value;

    switch (request.method) {
        case "OPTIONS":
            {
                return new Response("", { status: 200 });
            }
        case "GET":
            {
                const data = await namespace.get(path[path.length - 1]) || "";
                if (!assertType(JSON.parse(data))) {
                    return new Response(JSON.stringify({ error: "Invalid data format" }), { status: 400 });
                }
                return new Response(data || "", { status: data ? 200 : 404 });
            }
        case "POST":
            {
                const data = await request.text();
                if (!assertType(JSON.parse(data))) {
                    return new Response(JSON.stringify({ error: "Invalid data format" }), { status: 400 });
                }
                let entity = JSON.parse(data);
                entity.id = uuidv4();
                await namespace.put(entity.id, data);
                return new Response(JSON.stringify(entity), { status: 201 });
            }
        case "PUT":
            {
                const data = await request.text();
                if (!assertType(JSON.parse(data))) {
                    return new Response(JSON.stringify({ error: "Invalid data format" }), { status: 400 });
                }
                await namespace.put(path[path.length - 1], data);
                return new Response(data, { status: 200 });
            }
        case "DELETE":
            {
                await namespace.delete(path[path.length - 1]);
                return new Response("", { status: 204 });
            }
        default:
            return new Response(JSON.stringify({ error: "Unsupported method" }), { status: 405 });
    }
}

export default handleCRUD;
