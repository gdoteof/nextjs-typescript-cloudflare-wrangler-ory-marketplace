import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  List,
  ListItem,
  Avatar,
} from '@chakra-ui/react';
import { LegacyProfile } from '../../../../common/types/legacy_profile';  // Assuming you'll have these types in this file

const Header: React.FC<{ data: LegacyProfile }> = ({ data }) => {
  return (
      <Container maxW={'container.xl'}>
          <Flex
              backgroundImage="url(https://s3.amazonaws.com/golfmds/gmd/images/weirdpicture.jpg)"
              backgroundSize="cover"
              backgroundPosition="center"
              height="450px"
              position="relative"
              align="center">
              <Avatar
                  src={data.avatar.m}
                  size="xl"
                  position="absolute"
                  bottom="-30px"
                  left="50%"
                  transform="translateX(-50%)"
              />
          </Flex>
          <SimpleGrid columns={2} py={{ base: 18, md: 24 }}>
              <Flex>
                  <VStack>
                      <Box as={'header'}>
                          <Heading
                              lineHeight={1.1}
                              fontWeight={600}
                              fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
                              {data.name}
                          </Heading>
                          <Text
                              color={useColorModeValue('gray.900', 'gray.400')}
                              fontWeight={300}
                              fontSize={'2xl'}>
                              {data.locations[0]?.city}, {data.locations[0]?.state_province}
                          </Text>
                          <Text
                              color={useColorModeValue('gray.700', 'gray.300')}
                              fontSize={'lg'}>
                              {data.profile[0]?.bio}
                          </Text>
                      </Box>
                  </VStack>
              </Flex>
              <Flex>
              </Flex>
          </SimpleGrid>
      </Container>
  );
}

export default Header;
