'use client'

import { Facility } from '../facility'
import { AddFacilityForm } from "../AddFacilityForm";

const baseUrl = process.env.NEXT_PUBLIC_THRIV_API;

const AddFacilitiesPage: React.FC = () => {
    const handleFormSubmit = async (facility: Facility): Promise<Facility> => {
        try {
            let response = await fetch(`${baseUrl}/api/facility`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(facility),
            });
            let data = await response.json();
            return new Promise<Facility>((resolve, reject) => {
                resolve(data);
            });
        }
        catch (err) {
            console.error(err);
            return new Promise<Facility>((resolve, reject) => {
                reject(err);
            });
        }
    };

    return (
        <>
            <AddFacilityForm onSubmit={handleFormSubmit} />
        </>
    );
};

export default AddFacilitiesPage;