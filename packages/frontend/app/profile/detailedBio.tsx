import { Box, Text, Button } from "@chakra-ui/react";
import { useState } from 'react';
import { LegacyProfile } from '../../../../common/types/legacy_profile';  // Assuming you'll have these types in this file

const DetailedBio: React.FC<{ bio: LegacyProfile['profile'][0]['bio'] }> = ({ bio }) => {
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
