import { getUserSession } from './authN';
import { Configuration, Session, MetadataApi, RelationshipApi } from "@ory/client";
import fetchAdapter from '@haverstack/axios-fetch-adapter';


export async function handleAuthZ(request: Request, env: Env, session: Session): Promise<Response> {
        if (request.method === 'OPTIONS') {
            return new Response('', { status: 200 });
        }
        console.log('expected: ', env.ORY_SDK_URL, env.ORY_API_KEY, env.ORY_PRIVATE_API);
        let config = new Configuration({
            basePath: env.ORY_PRIVATE_API,
            apiKey: env.ORY_API_KEY,
            baseOptions: {
                adapter: fetchAdapter,
                headers: {"Authorization": `Bearer ${env.ORY_API_KEY}`},
            },
        });
        let relation_api = new RelationshipApi(config);
        let relations = await relation_api.getRelationships();
//        let is_admin = await permission_api.checkPermission({subjectId: session.identity.id, relation: "member", object: "Admins:global"});
        // nothing works
        return new Response('', { status: 200 });
}