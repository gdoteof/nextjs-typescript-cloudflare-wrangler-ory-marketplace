"use client";
export const runtime = "edge";

import { useEffect, useState } from "react";
import FacilityDetail from "../components/FacilityDetail";
import { Facility } from "../facility";
import FacilitiesClient from "../../_clients/facilitiesClient";
import { useToast } from "@chakra-ui/react";

type FacilityDetailPageProps = {
    params: {
        id: string;
    };
};

export default function FacilityDetailPage({ params: { id } }: FacilityDetailPageProps) {
    const [facility, setFacility] = useState<Facility | null>(null);
    const toast = useToast();

    // Handle form submission for editing
    const handleEditSubmit = async () => {
        if (!facility) {
            toast({
                title: "Error",
                description: "Facility not found!",
                status: "error",
                isClosable: true,
            });
            return;
        }

        try {
            await FacilitiesClient.update(facility.id, facility);
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
                description: `Error updating facility: ${JSON.stringify(e)}`,
                status: "error",
                isClosable: true,
            });
        }
    };

    // Fetch facility details using the provided ID
    useEffect(() => {
        if (id) {
            FacilitiesClient.fetchById(id)
                .then(setFacility)
                .catch((error) => {
                    console.error("Error fetching facility details:", error);
                    toast({
                        title: "Error",
                        description: `Error fetching facility details: ${JSON.stringify(error)}`,
                        status: "error",
                        isClosable: true,
                    });
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
