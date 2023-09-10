import { Result } from "../types";
import { path2KV, ResourceRequest } from "../utils/path2KV";
import { v4 as uuidv4 } from 'uuid';
import { getUserSession } from "./authN";
import { RelationshipApi, Configuration, RelationshipApiCreateRelationshipRequest, CreateRelationshipBody } from "@ory/client";
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
    console.log("entering createResource");
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
        console.log("id", id);
        console.log("typedEntity", typedEntity);
        await resourceAttempt.value.namespace.put(id, JSON.stringify(typedEntity));
        console.log("put successful");
        let set_result = await setResourceRelationship("Facilities", id, subject, "owner", subject, env);
        console.log("set_result", set_result);
        return new Response(JSON.stringify(typedEntity), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to create resource. Please try again later." }), { status: 500 });
    }
}

async function setResourceRelationship(namespace: string, objectId: string, subjectId: string, relationship: string, relationshipId: string, env: Env) {
    console.log("entering setResourceRelationship", namespace, objectId, subjectId, relationship, relationshipId);
    console.log("expecting: ", env.ORY_PRIVATE_API, env.ORY_API_KEY, env.ORY_SDK_URL);
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
    let body = await request.clone().json();
    console.log("<handling CRUD>",body, "</handling CRUD>");
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
              
                console.log("entering POST");
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
