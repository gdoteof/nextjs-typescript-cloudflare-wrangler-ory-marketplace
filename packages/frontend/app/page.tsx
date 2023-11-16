'use client'
import { Box, Flex, Heading, Text, Button, Image, Icon, Slide } from '@chakra-ui/react';
import { FaPlay } from 'react-icons/fa';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react';



const Home = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
      const handleScroll = () => {
            if(window.scrollY > 50) {
                setIsScrolled(true);
            }       

            if (window.scrollY <= 50) {
                setIsScrolled(false);
            }
          };

      window.addEventListener('scroll', handleScroll);

      return () => {
          window.removeEventListener('scroll', handleScroll);
      };
  }, []);

  return (
    <Flex direction="column" h="100vh" align="center" justify="center" bgGradient="linear(to-b, gray.800, gray.600)" color="white">
            
    {/* Main Content */}
    <Box textAlign="center" mb={8}>
        <Heading size="2xl" mb={4}>Welcome to Thriv</Heading>
        <Text fontSize="xl">Pioneering the Future of Sportstech</Text>
        
        {/* Play Button (Placeholder for possible promo video?) */}
        <Button mt={6} leftIcon={<Icon as={FaPlay} />} colorScheme="teal" variant="outline">
            Watch Our Story {isScrolled}
        </Button>
    </Box>

    {/* Scroll Down Indicator */}
    <Flex direction="column" align="center">
        <Text>Scroll to explore</Text>
        <ChevronDownIcon boxSize={8} mt={2} />
    </Flex>

            <Slide in={isScrolled}  direction="right"   style={{ width: "100%", height: "100vh" }}>
                <Box>
                  <Text> This could be anything at all</Text>
                </Box>
            </Slide>
</Flex>
  );
};

export default Home;
