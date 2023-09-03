export interface Provider {
    id: string;
    firstName: string;
    lastName: string;
    specialty: string;
}

export function isProvider(obj: Provider): boolean {
    return 'id' in obj &&
        'firstName' in obj &&
        'lastName' in obj &&
        'specialty' in obj;
}
