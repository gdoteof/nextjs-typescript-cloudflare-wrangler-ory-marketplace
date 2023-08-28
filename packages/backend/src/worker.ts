import { v4 as uuidv4 } from 'uuid';
import { Item, Result } from './types';
import { Facility } from '../../../common/types/facility';
export interface Env {
	FACILITY: KVNamespace;
	PROVIDER: KVNamespace;
	SERVICE: KVNamespace;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		let response =  await handleCRUD(request, env);
		return handleCORS(response, request);
	},
};
function handleCORS(response: Response, request: Request): Response {
	console.log("Handling CORS");
	const origin = request.headers.get('Origin');
	response.headers.set("Access-Control-Allow-Origin", origin || "*"),
	response.headers.set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS")
	response.headers.set("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")
	response.headers.set("Access-Control-Max-Age", "86400") // 24 hours
	return new Response(response.body, response);
}


function  path2KV(path: string[], env: Env): Result<KVNamespace, string> {
	switch (path[0]) {
		case 'api':
			switch (path[1]) {
				case 'facilities':
					return { kind: 'success', value: env.FACILITY };
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


async function handleCRUD(request: Request, env: Env): Promise<Response> {
	console.log("Handling CRUD", request);
	const url = new URL(request.url);
	const path = url.pathname.split('/').filter(Boolean);

	const namespaceAttempt = path2KV(path, env);

	if (namespaceAttempt.kind === 'failure') {
		return new Response(namespaceAttempt.error, { status: 400 });
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
			let body : Facility = await request.json();
			const id = body.id || uuidv4();
			await namespace.put(id, JSON.stringify(body), {
				metadata: {name: body.name, location: body.location.formatted_address, amenities: body.amenities}
			});
			console.log("Created", id, body);
			body.id = id;
			return new Response(JSON.stringify(body), { status: 201 });
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