import { handleAuth } from './thrivapi/auth';
import { handleCRUD } from './thrivapi/crud';
import { handleCORS } from './thrivapi/cors';


export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		console.log("fetch0", request.url);
		const {status} = await handleAuth(request, env);
		console.log("fetch1", request.url);
		if (status === 401) {
			return new Response('Unauthorized', { status: 401 });
		}
		console.log("fetch2", request.url);
		let response = await handleCRUD(request, env);
		console.log("fetch3", request.url);
		return handleCORS(response, request);
	},
};







