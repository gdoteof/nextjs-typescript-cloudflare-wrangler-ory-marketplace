"use client";
export const runtime = "edge";

import React, { useEffect, useState } from 'react';
import LegacyProfileClient from '../../_clients/legacyProfileClient'
import Profile from '../profile';
import { LegacyProfile } from '../../../../../common/types/legacy_profile';

const LegacyProfilePage: React.FC<{ slug: string }> = ({ slug }) => {
    const [profileData, setProfileData] = useState<LegacyProfile | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await LegacyProfileClient.fetchById(slug);
                setProfileData(data);
            } catch (error) {
                console.error("Error fetching legacy profile data:", error);
            }
        };

        fetchData();
    }, [slug]);

    if (!profileData) {
        return <div>Loading...</div>;
    }

    return <Profile profileData={profileData} />;
};

export default LegacyProfilePage;
