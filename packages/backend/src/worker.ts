import { v4 as uuidv4 } from 'uuid';
import { Item, Result } from './types';
import { Facility } from '../../../common/types/facility';
import { Configuration, FrontendApi, Session } from "@ory/client"
import { json } from 'stream/consumers';
import fetchAdapter from "@haverstack/axios-fetch-adapter"


interface Env {
	FACILITY: KVNamespace;
	PROVIDER: KVNamespace;
	BOOKING: KVNamespace;
	PROFILE: KVNamespace;
	SERVICE: KVNamespace;
	USER: KVNamespace;
	ORY_SDK_URL: "http://localhost:4000";
	USER_PROFILE: D1Database;
	USER_BOOKING: D1Database;
	FACILITY_PROVIDER: D1Database;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		// Check if the user is authorized
		console.log("top of fetch", request.method);
		console.log("before handleAuth", request.method);
		const {status} = await handleAuth(request, env, ctx);
		console.log("after handleAuth", request.method);
		if (status === 401) {
			return new Response('Unauthorized', { status: 401 });
		}
		let body = await handleCRUD(request, env);
		let response = new Response(JSON.stringify(body), { status: 200 });
		return handleCORS(response, request);
	},
};

export async function handleAuth(request: Request, env: Env, ctx: ExecutionContext) {
	if (request.method === 'OPTIONS') {
		return new Response('', { status: 200 });
	}
	console.log("About to call ory.toSession", env.ORY_SDK_URL);
	const ory = new FrontendApi(
		new Configuration({
			basePath: env.ORY_SDK_URL,
			baseOptions: {
				adapter: fetchAdapter
			},
		})
	);
	// get our cookies from the header
	const cookies = request.headers.get("Cookie") || undefined;
		const resp = await ory.toSession({ cookie: cookies })
		if (resp === undefined || resp.status === 401) {
			return { status: 401 };
		} else {
			return { status: 200 };
		}
}

function handleCORS(response: Response, request: Request): Response {
	const origin = request.headers.get('Origin');
	response.headers.set("Access-Control-Allow-Origin", origin || "*");
	response.headers.set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
	response.headers.set("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
	response.headers.set("Access-Control-Max-Age", "86400"); // 24 hours
	response.headers.set("Access-Control-Allow-Credentials", "true");
	return response;
}


function path2KV(path: string[], env: Env): Result<KVNamespace, string> {
	console.log("path2KV", path);
	console.log(path[0], "<- path0");
	console.log(path[1], "<- path1");

	switch (path[0]) {
		case 'api':
			console.log("path2KVmiddle", path, env.FACILITY);
			switch (path[1]) {
				case 'facility':
				case 'facilities':
					console.log("path2KVinner", path, env.FACILITY);
					return { kind: 'success', value: env.FACILITY };
				default:
					return { kind: 'failure', error: 'Could not map KV' };
			}
		case 'admin':
			switch (path[1]) {
				case 'facility':
					return { kind: 'success', value: env.FACILITY };
				case 'provider':
					return { kind: 'success', value: env.PROVIDER };
				case 'service':
					return { kind: 'success', value: env.SERVICE };
			}
	}

	return { kind: 'failure', error: 'Could not map KV' };

}


async function handleCRUD(request: Request, env: Env): Promise<any> {

	const url = new URL(request.url);
	const path = url.pathname.split('/').filter(Boolean);

	const namespaceAttempt = path2KV(path, env);

	if (namespaceAttempt.kind === 'failure') {
		return new Response(namespaceAttempt.error, { status: 421 });
	}

	const namespace = namespaceAttempt.value;
	const resourceId = path[2];

	console.log("entering above switch");
	switch (request.method) {
		case 'GET':
			if (resourceId === undefined) {
				const value = await namespace.list();
				return new Response(JSON.stringify(value), { status: 200 });
			} else {
				const resource = await namespace.get(resourceId);
				return new Response(resource, { status: resource ? 200 : 404 });
			}
			break;
		case 'POST':
			let body: Facility = await request.json();
			const id = body.id || uuidv4();
			await namespace.put(id, JSON.stringify(body), {
				metadata: { name: body.name, location: body.location.formatted_address, amenities: body.amenities }
			});
			console.log("Created", id, body);
			body.id = id;
			return body;
		case 'PUT':
			const existingItem: Item = await request.json();
			namespace.put(existingItem.id, JSON.stringify(existingItem));
			break;
		case 'DELETE':
			const deletionItem: Item = await request.json();
			namespace.delete(deletionItem.id);
			break;
		case 'OPTIONS':
			return new Response('', { status: 200 });
		default:
			return new Response('Method not allowed', { status: 405 });
	}

	return new Response('Endpoint not found', { status: 404 });
}


/*
# Docs: https://developers.cloudflare.com/workers/runtime-apis/kv
		{ binding = "ITEM", id = "d758d62cccfe4834ba3d69dd68b62a4e" },
		{ binding = "CATEGORY", id = "7d05efd21755430ca51130e77167656e" }
*/