import { handleAuth } from './thrivapi/authN';
import { handleCRUD } from './thrivapi/crud';
import { handleCORS } from './thrivapi/cors';


export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		/*
		const {status} = await handleAuth(request, env);
		if (status === 401) {
			return new Response('Unauthorized', { status: 401 });
		}
		*/
		let response = await handleCRUD(request, env);
		return handleCORS(response, request);
	},
};







