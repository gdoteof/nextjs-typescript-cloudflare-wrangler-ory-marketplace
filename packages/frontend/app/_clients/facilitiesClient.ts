import { get, post, put, deleteRequest } from '../_utils/restClient';
import { Amenities } from '../facilities/amenity';

type Facility = {
    id: string;
    name: string;
    location: google.maps.places.PlaceResult;
    amenities: typeof Amenities;
    associatedServiceProviders: string[]; // Array of Service Provider IDs
};

class FacilitiesClient {
    private static endpoint = '/facilities';

    static async fetchAll(): Promise<Facility[]> {
        const response = await get(this.endpoint);
        return response.json();
    }

    static async fetchById(id: string): Promise<Facility> {
        const response = await get(`${this.endpoint}/${id}`);
        return response.json();
    }

    static async create(data: Partial<Facility>): Promise<Facility> {
        const response = await post(this.endpoint, data);
        return response.json();
    }

    static async update(id: string, data: Partial<Facility>): Promise<Facility> {
        const response = await put(`${this.endpoint}/${id}`, data);
        return response.json();
    }

    static async delete(id: string): Promise<void> {
        await deleteRequest(`${this.endpoint}/${id}`);
    }
}

export default FacilitiesClient;
