'use client'
import { useEffect, useState } from 'react';
import FacilityDetail from '../components/FacilityDetail';
import { Facility } from '../facility';

const baseUrl = process.env.NEXT_PUBLIC_THRIV_API;
export default function FacilityDetailPage(   {params}  : {params: {id: string}   }  ) {
    const {id} = params;

    const [facility, setFacility] = useState<Facility|null>(null);

    useEffect(() => {
        if (id) {
            // Fetch facility details based on the ID.
            // This is a placeholder and would need to be replaced with your actual data fetching logic.
            fetch(`${baseUrl}/api/facilities/${id}`)
                .then(response => response.json())
                .then(data => {
                    console.log("facilities response:", data);
                    setFacility(data);
                })
                .catch(error => {
                    console.error("Error fetching facility details:", error);
                });
        }
    }, [id]);

    if (!facility) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <FacilityDetail venue={{
                name: facility.name,
                location: {
                    formatted_address: facility?.location.formatted_address  || ''
                },
                amenities: facility.amenities
            }} />
        </div>
    );
};