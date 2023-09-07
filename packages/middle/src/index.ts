import { Router } from 'itty-router';
/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import apiRouter from './router';

// Export a default object containing event handlers
export default {
	// The fetch handler is invoked when this worker receives a HTTP(S) request
	// and should return a Response (optionally wrapped in a Promise)
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		// You'll find it helpful to parse the request.url string into a URL object. Learn more at https://developer.mozilla.org/en-US/docs/Web/API/URL
		const url = new URL(request.url);
		const slug = url.pathname.split('/')[1];
		const path = url.pathname.split('/').slice(2).join('/');
		switch (slug) {
			case 'api':
				let router = Router();
				router.all('/api/*', async request => {
					let innerResponse = await fetch(env.THRIVAPI_USER_BASE_URL + path, request);
					let res = new Response(innerResponse.body, innerResponse);
					return res;
				});

				router.all('/admin/*', async request => {
					let innerResponse = await fetch(env.THRIVAPI_ADMIN_BASE_URL + path, request);
					let res = new Response(innerResponse.body, innerResponse);
					return res;
				});


				router.get('/', async () => {
					`Try making requests to:
						<ul>
						<li><code><a href="/redirect?redirectUrl=https://example.com/">/redirect?redirectUrl=https://example.com/</a></code>,</li>
						<li><code><a href="/proxy?modify&proxyUrl=https://example.com/">/proxy?modify&proxyUrl=https://example.com/</a></code>, or</li>
						<li><code><a href="/api/todos">/api/todos</a></code></li>`
				}
				);

				router.all('*', () => {
					return new Response('Bad Request', { status: 400 });
				});

				return router.handle(request);
			default:
				return new Response('Bad Request', { status: 400 });
		};
	}
}