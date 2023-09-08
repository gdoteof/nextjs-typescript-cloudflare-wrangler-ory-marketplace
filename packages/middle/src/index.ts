import { Router } from 'itty-router';
import { error, json, missing } from 'itty-router-extras'
import { createCors } from 'itty-cors'




export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		console.log("000fetch", request.url);
		const url = new URL(request.url);
		const slug = url.pathname.split('/')[1];
		const path = url.pathname.split('/').slice(2).join('/');
		console.log("010fetch", slug, path);
		const { preflight, corsify } = createCors({
			methods: ['GET', 'POST', 'DELETE', 'PUT'], // GET is included by default... omit this if only using GET
			origins: ['*'],                     // defaults to allow all (most common).  Restrict if needed.
			maxAge: 3600,
			headers: {
			  'Access-Control-Allow-Credentials': 'true',
			  'Access-Control-Allow-Origin': '*',
			},
		  })
		const router = Router();

		router
			.all('*', preflight)
			.all('/api/*', async request => {
				console.log("001fetch", request.url);
				let innerResponse = await fetch(env.THRIVAPI_USER_BASE_URL + path, request);
				console.log("002fetch", innerResponse);
				let res = new Response(innerResponse.body, innerResponse);
				console.log("003fetch", res);
				return res;
			})
			.all('/admin/*', async request => {
				let innerResponse = await fetch(env.THRIVAPI_ADMIN_BASE_URL + path, request);
				let res = new Response(innerResponse.body, innerResponse);
				return res;
			})
			.get('/', async () => {
				console.log("004fetch");
				return new Response(`Try making requests to:
				<ul>
				<li><code><a href="/redirect?redirectUrl=https://example.com/">/redirect?redirectUrl=https://example.com/</a></code>,</li>
				<li><code><a href="/proxy?modify&proxyUrl=https://example.com/">/proxy?modify&proxyUrl=https://example.com/</a></code>, or</li>
				<li><code><a href="/api/todos">/api/todos</a></code></li>`)
			})
			.all('*', () => {
				missing('Try making requests to <code>/api/</code>')
			}).handle(request)
			.catch(err => error(500, err.stack))
			.then(corsify);
	}
}