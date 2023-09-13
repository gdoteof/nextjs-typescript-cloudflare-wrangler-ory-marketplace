'use client'
import { Box, Text, Button } from "@chakra-ui/react";
import { useState } from 'react';

interface DetailedBioProps {
    bio: string;
}

const DetailedBio: React.FC<DetailedBioProps> = ({ bio }) => {
    const [showFullBio, setShowFullBio] = useState(false);
    const maxChars = 200;
    const displayBio = showFullBio ? bio : `${bio.substring(0, maxChars)}...`;

    return (
        <Box>
            <Text>{displayBio}</Text>
            {bio.length > maxChars && (
                <Button onClick={() => setShowFullBio(!showFullBio)}>
                    {showFullBio ? 'Read Less' : 'Read More'}
                </Button>
            )}
        </Box>
    );
}

export default DetailedBio;
