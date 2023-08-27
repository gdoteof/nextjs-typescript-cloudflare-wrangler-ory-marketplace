export interface Facility {
    id: string;
    name: string;
    location: google.maps.GeocoderResult;
    amenities: string;
    associatedServiceProviders: string[]; // Array of Service Provider IDs
}