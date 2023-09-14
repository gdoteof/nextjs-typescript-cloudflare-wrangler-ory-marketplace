import { Amenities } from "./amenity";

export interface Facility {
    id: string;
    name: string;
    location: google.maps.places.PlaceResult;
    amenities: typeof Amenities;
    associatedServiceProviders: string[]; // Array of Service Provider IDs
}

export function isFacility(obj: Facility): boolean {
    return 'id' in obj &&
        'name' in obj &&
        'location' in obj &&
        'amenities' in obj &&
        'associatedServiceProviders' in obj;
}
