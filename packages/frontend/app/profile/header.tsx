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
  import { MdLocalShipping } from 'react-icons/md';
  
  const ProductProfile = () => {
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
      <Container maxW={'container.xl'}>
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 18, md: 24 }}>
          <Flex
            backgroundImage="url(https://s3.amazonaws.com/golfmds/gmd/images/weirdpicture.jpg)"
            backgroundSize="cover"
            backgroundPosition="center"
            height="450px"
            position="relative"
            align="center">
            <Avatar
              src={data.header.avatarUrl}
              size="xl"
              position="absolute"
              bottom="-30px"
              left="50%"
              transform="translateX(-50%)"
            />
          </Flex>
          <Stack spacing={{ base: 6, md: 10 }}>
            <Box as={'header'}>
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
                {data.header.name}
              </Heading>
              <Text
                color={useColorModeValue('gray.900', 'gray.400')}
                fontWeight={300}
                fontSize={'2xl'}>
                {data.header.location}
              </Text>
              <Text
                color={useColorModeValue('gray.700', 'gray.300')}
                fontSize={'lg'}>
                {data.bio}
              </Text>
            </Box>
            <Box>
              <Text
                fontSize={{ base: '16px', lg: '18px' }}
                color={useColorModeValue('yellow.500', 'yellow.300')}
                fontWeight={'500'}
                textTransform={'uppercase'}
                mb={'4'}>
                Quick Info
              </Text>
              <List spacing={2}>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Sponsor:
                  </Text> 
                  {data.quickInfo.sponsorName}
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Specialties:
                  </Text> 
                  {data.quickInfo.specialties.map(s => s.name).join(', ')}
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Certifications:
                  </Text> 
                  {data.quickInfo.certifications.map(c => c.name).join(', ')}
                </ListItem>
              </List>
            </Box>
            {/* ... other parts of the component can be integrated here ... */}
          </Stack>
        </SimpleGrid>
      </Container>
    );
  }
  
  export default ProductProfile;
  