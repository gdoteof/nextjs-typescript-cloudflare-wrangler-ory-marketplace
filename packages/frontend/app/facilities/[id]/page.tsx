"use client";
export const runtime = "edge";

import { useEffect, useState } from "react";
import FacilityDetail from "../components/FacilityDetail";
import { Facility } from "../facility";
import FacilitiesClient from "../../_clients/facilitiesClient";
import { useToast } from "@chakra-ui/react";

export default function FacilityDetailPage({
    params,
}: {
    params: { id: string };
}) {
    console.log("attempting facility params:", params);
    const { id } = params;
    const [isEditing, setIsEditing] = useState(false);

    const [facility, setFacility] = useState<Facility | null>(null);
    //use toast to give error
    const toast = useToast();

    const handleEditSubmit = async (event:any) => {
        if (!facility) {
            return;
        }

        try {
            let updated = await FacilitiesClient.update(facility.id, facility);
            toast({
                title: "Facility Updated",
                description: "The facility has been successfully updated!",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (e: unknown) {
            toast({
                title: "Error",
                description: JSON.stringify(e),
                status: "error",
            });
        }
    };

    useEffect(() => {
        if (id) {
            FacilitiesClient.fetchById(id)
                .then((facility) => {
                    setFacility(facility);
                })
                .catch((error) => {
                    console.error("Error fetching facility details:", error);
                });
        }
    }, [id]);

    if (!facility) {
        return <p>Loading...</p>;
    }

    return (
            <FacilityDetail
                venue={{
                    name: facility.name,
                    location: {
                        formatted_address: facility?.location.formatted_address || "",
                    },
                    amenities: facility.amenities,
                }}
                onEdit={handleEditSubmit}
            />
    );
    
}