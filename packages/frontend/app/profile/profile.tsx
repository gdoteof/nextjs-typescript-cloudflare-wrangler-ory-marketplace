import React from 'react';
import Header from './header';
import QuickInfo from './quickInfo';
import DetailedBio from './detailedBio';
import Achievements from './achievements';
import Availability from './availability';
import Ratings from './ratings';
import { VStack } from "@chakra-ui/react";

const Profile: React.FC = () => {
    // Sample data for demonstration
    const data = {
        header: {
            coverUrl: "path_to_cover_image.jpg",
            avatarUrl: "path_to_avatar.jpg",
            name: "John Doe",
            averageRating: 4.5,
            reviewCount: 123,
            bookingAllowed: true
        },
        quickInfo: {
            sponsorName: "XYZ Corporation",
            specialties: [{ name: "Cardiology" }, { name: "Pulmonology" }],
            certifications: [{ name: "Certification A", imageUrl: "path_to_cert_image.jpg" }]
        },
        bio: "Sample biography of the doctor...",
        achievements: [{ name: "Achievement A" }, { name: "Achievement B" }],
        availability: { min: 0, max: 100, value: 50 },
        ratings: [
            { user: "Alice", avatarUrl: "path_to_avatar.jpg", rating: 5, comment: "Great doctor!" },
            // ... other ratings
        ]
    };

    return (
        <VStack spacing={6} p={6}>
            <Header {...data.header} />
            <QuickInfo {...data.quickInfo} />
            <DetailedBio bio={data.bio} />
            <Achievements achievements={data.achievements} />
            <Availability {...data.availability} />
            <Ratings ratings={data.ratings} />
        </VStack>
    );
}

export default Profile;
