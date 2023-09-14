export function handleCORS(response: Response, request: Request): Response {
	const origin = request.headers.get('Origin');
	response.headers.set("Access-Control-Allow-Origin", origin || "*");
	response.headers.set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
	response.headers.set("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
	response.headers.set("Access-Control-Max-Age", "86400"); // 24 hours
	response.headers.set("Access-Control-Allow-Credentials", "true");
	return response;
}