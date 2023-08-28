import   {Amenities}  from "./amenity";

export interface Facility {
    id: string;
    name: string;
    location: google.maps.places.PlaceResult;
    amenities: typeof Amenities;
    associatedServiceProviders: string[]; // Array of Service Provider IDs
}