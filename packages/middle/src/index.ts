import { Router } from 'itty-router';
import { json, missing } from 'itty-router-extras'
import { createCors } from 'itty-cors'
import { getUserSession } from './auth';


const { preflight, corsify } = createCors({
	methods: ['GET', 'POST', 'DELETE', 'PUT'],
	origins: ['*'],
	maxAge: 3600,
	headers: {
		'Access-Control-Allow-Credentials': 'true',
		'Access-Control-Allow-Origin': '*',
	},
})

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const host = request.headers.get('Origin') || '*';
		if(request.method === 'OPTIONS') {
			return addCors(new Response('', { status: 200 }), host);
		}

		let session = await getUserSession(request.clone(), env);
		if (session?.id == null) {
			return new Response('Unauthorized', { status: 401 });
		}


		let body = await request.json();
		        // Create a new request body with wrapped content
				const newRequestBody = {
					subject: session.id,
					data: body
				};
		
				// Construct a new request using the original request and the new body
				const newRequest = new Request(request.url, {
					method: request.method,
					headers: request.headers,
					body: JSON.stringify(newRequestBody)
				});
		let res = await env.api.fetch(newRequest.clone());
		return addCors(res, host);
	}
}

const addCors = (response: Response, host: string) => {
	console.log("adding cors");
	let headers = new Headers(response.headers);
	headers.set('Access-Control-Allow-Origin', host);
	headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
	headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	headers.set('Access-Control-Allow-Credentials', 'true');
	let res = new Response(response.body, { ...response, headers });
	return res;
}