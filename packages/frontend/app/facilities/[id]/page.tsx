'use client'
export const runtime = 'edge';

import { useEffect, useState } from 'react';
import FacilityDetail from '../components/FacilityDetail';
import { Facility } from '../facility';
import FacilitiesClient from '../../_clients/facilitiesClient';

export default function FacilityDetailPage(   {params}  : {params: {id: string}   }  ) {
    console.log("attempting facility params:", params);
    const {id} = params;

    const [facility, setFacility] = useState<Facility|null>(null);

    useEffect(() => {
        if (id) {
            FacilitiesClient.fetchById(id)
                .then(facility => {
                    setFacility(facility);
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