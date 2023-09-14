import { path2KV, ResourceRequest } from "../utils/path2KV";
import { v4 as uuidv4 } from 'uuid';
import { RelationshipApi, Configuration, RelationshipApiCreateRelationshipRequest } from "@ory/client";
import fetchAdapter from "@haverstack/axios-fetch-adapter";

export async function updateRelationship(subject: string, relationship: string, relationshipId: string, env: Env) {
    return;
    /*
    const relationshipApi = new RelationshipApi(env.ORY_SDK_URL);
    const session = await getUserSession(request, env);
    const resp = await relationshipApi.upsertRelationship(session.id, subject, relationship, relationshipId);
    */
}

async function createResource<T  extends { id: string }>(request: Request, env: Env, path: string[]) {
    try {
        let resourceRequest : ResourceRequest<T> = await request.json();
        let subject = resourceRequest.subject;
        let resourceAttempt = path2KV(path, env);
        if (resourceAttempt.kind !== "success") {
            return new Response(JSON.stringify({ error: resourceAttempt.error }), { status: 404 });
        }
        let typedEntity = resourceAttempt.value.asType(resourceRequest.data);
        let id = uuidv4();
        typedEntity.id = id;
        await resourceAttempt.value.namespace.put(id, JSON.stringify(typedEntity));
        await setResourceRelationship("Facilities", id, subject, "owner", subject, env);
        return new Response(JSON.stringify(typedEntity), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to create resource. Please try again later." }), { status: 500 });
    }
}

async function setResourceRelationship(namespace: string, objectId: string, subjectId: string, relationship: string, relationshipId: string, env: Env) {
    let config = new Configuration({
        basePath: env.ORY_PRIVATE_API,
        apiKey: env.ORY_API_KEY,
        baseOptions: {
            adapter: fetchAdapter,
            headers: {"Authorization": `Bearer ${env.ORY_API_KEY}`},
        },
    });
    const relationshipApi = new RelationshipApi(config);
    const newRelationBody : RelationshipApiCreateRelationshipRequest = {
        createRelationshipBody: {
            subject_id: subjectId,
            namespace: namespace,
            object: objectId,
            relation: relationship,
        }
    }
    try {
        let response = await relationshipApi.createRelationship(newRelationBody);
        let status = response.status;
        console.log("status", status);
        console.log("response", response);
        let body = response.data;
        return body;

    } catch (error) {
        console.log("error", error);
        return;
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
                // path[0] = api
                // path[1] = namespace
                // path[2] = id
                if (path.length == 3){
                    const data = await namespace.get(path[path.length - 1]) || "";
                    return new Response(data || "", { status: data ? 200 : 404 });
                } else {
                    const list= await namespace.list({ limit: 10})
                    return new Response(JSON.stringify(list.keys.map(asType)), { status: 200}); }
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
