import { Result } from "../types";
import { Facility, isFacility } from "../../../../common/types/facility";
import { Provider, isProvider } from "../../../../common/types/provider";

interface ResourceType<T> {
    namespace: KVNamespace;
    assertType: (obj: T) => boolean;
}

type ResourceMap = {
    [key: string]: ResourceType<any>;
};

export function path2KV(path: string[], env: Env): Result<ResourceType<any>, string> {
    const resources: ResourceMap = {
        facility: { namespace: env.FACILITY, assertType: (obj: any) => isFacility(obj) },
        provider: { namespace: env.PROVIDER, assertType: (obj: any) => isProvider(obj) }
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
