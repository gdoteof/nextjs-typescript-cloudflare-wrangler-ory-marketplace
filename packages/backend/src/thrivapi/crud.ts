import { Result } from "../types";
import { path2KV } from "../utils/path2KV";
import { v4 as uuidv4 } from 'uuid';
import { getUserSession } from "./authN";

async function createResource<T  extends { id: string }>(request: Request, env: Env, path: string[]) {
    // Retrieve user's ID or username from the session using the utility function
    const userSession = await getUserSession(request, env);
    const userId = userSession.identity.id;  // Assuming the user ID is stored under 'identity.id' in the session data.

    // Check if user is part of the Admins namespace using ORY Keto client
    const isAdminCheck = userSession.identity.credentials;
    console.log("isAdminCheck", isAdminCheck);
    const isAdmin = true; //isAdminCheck && isAdminCheck.data.allowed;

    try {
        if (path[0] === "facilities" && !isAdmin) {
            return new Response(JSON.stringify({ error: "Unauthorized: Only admins can create facilities." }), { status: 403 });
        }
        let entity : T = await request.json();
        entity.id = uuidv4();
        let resourceAttempt = path2KV(path, env);
        if (resourceAttempt.kind === "failure") {
            return new Response(JSON.stringify({ error: resourceAttempt.error }), { status: 404 });
        }
        let typedEntity = resourceAttempt.value.asType(entity);
        let returnedEntity = await resourceAttempt.value.namespace.put(typedEntity, JSON.stringify(entity));
        return new Response(JSON.stringify(returnedEntity), { status: 201 });
    } catch (error) {
        console.error("Error while creating resource:", error);
        return new Response(JSON.stringify({ error: "Failed to create resource. Please try again later." }), { status: 500 });
    }
}



interface ResourceType<T> {
    namespace: KVNamespace;
    assertType: (obj: any) => obj is T;
    validate: (data: any) => boolean;
}

export async function handleCRUD(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname.split("/").filter(Boolean);
    const resourceAttempt = path2KV(path, env);

    if (resourceAttempt.kind === "failure") {
        return new Response(JSON.stringify({ error: resourceAttempt.error }), { status: 404 });
    }

    const { namespace, assertType, asType } = resourceAttempt.value;

    switch (request.method) {
        case "OPTIONS":
            {
                return new Response("", { status: 200 });
            }
        case "GET":
            {
                const data = await namespace.get(path[path.length - 1]) || "";
                const typedData = asType(JSON.parse(data));
                return new Response(data || "", { status: data ? 200 : 404 });
            }
        case "POST":
            {
              
                let response = await createResource(request, env, path);
                return response;
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
