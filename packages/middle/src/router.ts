import { Router } from 'itty-router'

const routerWrapper = (adminBaseUrl: string, userBaseUrl: string) => {
  const router = Router()

  router.all('/api/*', async request => {
    let url = new URL(request.url);
    const path = url.pathname.split('/').slice(2).join('/');
    let response = await fetch( path, request);
    let res = new Response(response.body, response);
    return res;
  });

  router.all('/admin/*', async request => {
    let url = new URL(request.url);
    const path = url.pathname.split('/').slice(2).join('/');
    return new Response(`Admin Route for path: ${path}`);
  });

  // Catch-all route for any other paths
  router.all('*', async request => {
    return new Response('Bad Request', { status: 400 });
  });

  return router;
}
export default routerWrapper;
