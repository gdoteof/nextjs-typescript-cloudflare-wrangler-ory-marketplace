import { Box, Image, Text, Button, HStack, Icon } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

interface HeaderProps {
    coverUrl: string;
    avatarUrl: string;
    name: string;
    averageRating: number;
    reviewCount: number;
    bookingAllowed: boolean;
}

const Header: React.FC<HeaderProps> = ({ coverUrl, avatarUrl, name, averageRating, reviewCount, bookingAllowed }) => {
    return (
        <Box position="relative">
            <Image src={coverUrl} width="100%" />
            <Box position="absolute" bottom="0" left="50%" transform="translateX(-50%)">
                <Image borderRadius="50%" boxSize="100px" src={avatarUrl} border="4px" borderColor="white" />
            </Box>
            <HStack spacing={4} position="absolute" bottom="4" left="4">
                <Text fontSize="xl" fontWeight="bold">{name}</Text>
                <HStack spacing={1}>
                    <Icon as={StarIcon} color="yellow.400" />
                    <Text>{averageRating.toFixed(1)}</Text>
                    <Text>({reviewCount})</Text>
                </HStack>
            </HStack>
            {bookingAllowed && (
                <Button position="absolute" right="4" bottom="4" colorScheme="teal">Book Now</Button>
            )}
        </Box>
    );
}

export default Header;
