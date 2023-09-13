// Ratings.tsx
import { Box, VStack, HStack, Text, Avatar, Icon } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

interface RatingProps {
    ratings: Array<{ user: string, avatarUrl: string, rating: number, comment: string }>;
}

const Ratings: React.FC<RatingProps> = ({ ratings }) => {
    return (
        <VStack align="start" spacing={4}>
            {ratings.map((rating, idx) => (
                <Box key={idx} p={4} w="100%" boxShadow="sm" borderRadius="md">
                    <HStack spacing={4}>
                        <Avatar size="sm" src={rating.avatarUrl} />
                        <VStack align="start">
                            <HStack spacing={1}>
                                <Icon as={StarIcon} color="yellow.400" />
                                <Text>{rating.rating}</Text>
                            </HStack>
                            <Text>{rating.comment}</Text>
                        </VStack>
                    </HStack>
                </Box>
            ))}
        </VStack>
    );
}

export default Ratings;
