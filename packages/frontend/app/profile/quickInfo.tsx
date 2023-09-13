import { Box, Text, HStack, Image, VStack, Badge, Tooltip } from "@chakra-ui/react";

interface QuickInfoProps {
    sponsorName?: string;
    specialties: Array<{ name: string }>;
    certifications: Array<{ name: string, imageUrl: string }>;
}

const QuickInfo: React.FC<QuickInfoProps> = ({ sponsorName, specialties, certifications }) => {
    return (
        <VStack align="start" spacing={4}>
            {sponsorName && <Text fontWeight="bold">Sponsored by: {sponsorName}</Text>}
            <HStack spacing={2}>
                {specialties.map(specialty => (
                    <Badge key={specialty.name} colorScheme="green">{specialty.name}</Badge>
                ))}
            </HStack>
            <HStack spacing={2}>
                {certifications.map(cert => (
                    <Tooltip key={cert.name} label={cert.name} aria-label={cert.name}>
                        <Image src={cert.imageUrl} boxSize="24px" />
                    </Tooltip>
                ))}
            </HStack>
        </VStack>
    );
}

export default QuickInfo;
