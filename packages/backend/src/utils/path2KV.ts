import { Result } from "../types";
import { Facility, isFacility } from "../../../../common/types/facility";
import { Provider, isProvider } from "../../../../common/types/provider";
import { type } from "os";

interface ResourceType<T> {
    namespace: KVNamespace;
    assertType: (obj: T) => boolean;
    asType: (obj: any) => T;
}

export interface ResourceRequest<T> {
    subject: string;
    data: T;
}

type ResourceMap = {
    [key: string]: ResourceType<any>;
};

export function path2KV(path: string[], env: Env): Result<ResourceType<any>, string> {
    console.log('facility env:', env.FACILITY);
    let facility_obj = Object.keys(env.FACILITY);
    console.log('facility_obj', facility_obj);
    const resources: ResourceMap = {
        facility: { namespace: env.FACILITY, assertType: (obj: any) => isFacility(obj), asType: (obj: any) => obj as Facility },
        provider: { namespace: env.PROVIDER, assertType: (obj: any) => isProvider(obj) , asType: (obj: any) => obj as Provider}
    };

    switch (path[0]) {
        case 'api':
            return resources[path[1]]
                ? { kind: 'success', value: resources[path[1]] }
                : { kind: 'failure', error: 'Could not map KV' };
        case 'admin':
            return resources[path[1]]
                ? { kind: 'success', value: resources[path[1]] }
                : { kind: 'failure', error: 'Could not map KV' };
        default:
            return { kind: 'failure', error: 'Could not map KV' };
    }
}

export async function kv2Request<type>(request: Request, env: Env, path: string[], type: ResourceType<type>): Promise<ResourceRequest<type>> {
    const subject = path[path.length - 1];
    const data : type = await request.json();
    return { subject, data };

}
