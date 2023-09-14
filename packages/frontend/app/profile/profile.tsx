"use client"
import './profile.css';
import './profile.css';
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
            avatarUrl: "https://golfmds.s3.amazonaws.com/user/1b2d6b1019c17cecf8a00e29fc75af6b/photo/ff6edb9dddc8844bccbd4a9e2bc6c79c_m.jpg",
                        name: "John Doe",
            averageRating: 4.5,
            reviewCount: 123,
            bookingAllowed: true,
            location: "Hiensburg, VT"
        },
        quickInfo: {
            sponsorName: "XYZ Corporation",
            specialties: [{ name: "Cardiology" }, { name: "Pulmonology" }],
            certifications: [{ name: "Certification A", imageUrl: "path_to_cert_image.jpg" }]
        },
        bio: "Sample biography of the doctor...",
        achievements: [{ name: "Achievement A" }, { name: "Achievement B" }],
                ratings: [
            { user: "Alice", avatarUrl: "path_to_avatar.jpg", rating: 5, comment: "Great doctor!" },
            // ... other ratings
        ]
    };

    return (
        <VStack className="vStackStyle" spacing={6} p={6}>
            <Header />
            <QuickInfo {...data.quickInfo} />
            <DetailedBio bio={data.bio} />
            <Achievements achievements={data.achievements} />
                        <Ratings ratings={data.ratings} />
        </VStack>
    );
}

export default Profile;
