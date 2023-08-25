/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
import { v4 as uuidv4 } from 'uuid';


export interface Env {
	CATEGORY: KVNamespace;
	ITEM: KVNamespace;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		return await handleRequest(request, env);
	},
};

import { Item, Result } from './types';

function  path2KV(path: string[], env: Env): Result<KVNamespace, string> {
	switch (path[0]) {
		case 'category':
			return { kind: 'success', value: env.CATEGORY };
		case 'item':
			return { kind: 'success', value: env.ITEM };
		default:
			return { kind: 'failure', error: 'Could not map KV' };
	}
}


async function handleRequest(request: Request, env: Env): Promise<Response> {
	const url = new URL(request.url);
	const path = url.pathname.split('/').filter(Boolean);

	const namespaceAttempt = path2KV(path, env);

	if (namespaceAttempt.kind === 'failure') {
		return new Response(namespaceAttempt.error, { status: 400 });
	}

	const namespace = namespaceAttempt.value;
	const resourceId = path[1];

	switch (request.method) {
		case 'GET':
			const resource = await namespace.get(resourceId);
			return new Response(resource, { status: resource ? 200 : 404 });
			break;
		case 'POST':
			const newItem: Item = await request.json();
			const id = newItem.id || uuidv4();
			let response = namespace.put(id, JSON.stringify(newItem));
			return new Response(JSON.stringify({ id }), { status: 201 });
		case 'PUT':
			const existingItem: Item = await request.json();
			namespace.put(existingItem.id, JSON.stringify(existingItem));
			break;
		case 'DELETE':
			const deletionItem: Item = await request.json();
			namespace.delete(deletionItem.id);
			break;
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