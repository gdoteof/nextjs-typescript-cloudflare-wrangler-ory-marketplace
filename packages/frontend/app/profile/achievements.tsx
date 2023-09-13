import { Box, VStack, Text } from "@chakra-ui/react";

interface AchievementsProps {
    achievements: Array<{ name: string }>;
}

const Achievements: React.FC<AchievementsProps> = ({ achievements }) => {
    return (
        <VStack align="start" spacing={2}>
            {achievements.map(achievement => (
                <Box key={achievement.name} p={2} borderRadius="md" bg="gray.100" _hover={{ bg: "gray.200" }}>
                    <Text>{achievement.name}</Text>
                </Box>
            ))}
        </VStack>
    );
}

export default Achievements;
