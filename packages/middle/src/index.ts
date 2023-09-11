import { authorizedSession } from './auth';
import { Session } from '@ory/client';

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const host = request.headers.get('Origin') || '*';
		if (request.method === 'OPTIONS') {
			return addCors(new Response('', { status: 200 }), host);
		}

		let session: Session | false;
		try {
			session = await authorizedSession(request.clone(), env);
		} catch (error) {
			return new Response('Error attempting auth', { status: 500 });
		}

		if (!session) {
			return new Response('Unauthorized', { status: 401 });
		}

		let body = await request.json();

		const newRequestBody = {
			subject: session.id,
			data: body
		};

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