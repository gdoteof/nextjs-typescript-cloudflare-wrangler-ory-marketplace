/// <reference types="@types/google.maps" />

type Metadata = {
    [key: string]: any;
}

interface Category {
    id: string;
    name: string;
    metadata: Metadata;
}

interface Item {
    id: string;
    name: string;
    metadata: Metadata;
    categories?: Category[];
}

type Success<T> = {
    kind: "success";
    value: T;
}

type Failure<E> = {
    kind: "failure";
    error: E;
}

type Result<T, E> = Success<T> | Failure<E>;


export type { Metadata, Category, Item, Result };

// Types for Service Providers (Coaches)
interface ServiceProvider {
    id: string;
    name: string;
    profileDetails: string;
    associatedServices: string[]; // Array of Service IDs
    associatedFacilities: string[]; // Array of Facility IDs
}

// Types for Services
interface Service {
    id: string;
    name: string;
    description: string;
    price: number;
    duration: number;
    serviceProviderId: string; // Who offers this service
    bookings: string[]; // Array of Booking IDs
}

// Types for Facilities
export interface Facility {
    id: string;
    name: string;
    location: google.maps.GeocoderResult;
    amenities: string;
    associatedServiceProviders: string[]; // Array of Service Provider IDs
}

// Types for Users
interface User {
    id: string;
    name: string;
    bookedServices: string[]; // Array of Booking IDs
}

// Types for Bookings
interface Booking {
    id: string;
    serviceId: string;
    userId: string;
    requestedTimeSlot: Date;
    status: 'Requested' | 'Confirmed' | 'Completed';
}
