export interface RoutingRule {
    method: string;
    backendEndpoint: string;
    authRequired: boolean;
}

const rules : RoutingRule[] = [
    {
        method: 'GET',
        backendEndpoint: 'https://api.thriv.systems/todos',
        authRequired: true,
    },
    // Additional rules can be added here as needed.
];

export default rules;
