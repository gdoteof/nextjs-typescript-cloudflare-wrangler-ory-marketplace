import { Box, Heading, Text, Icon, List, ListItem } from "@chakra-ui/react";
import { FaMapMarkedAlt } from "react-icons/fa"; // Assuming you're using `react-icons` for icons. If not, you can use Chakra's built-in icons.

interface FacilityItem {
  name: string;
  location: {
    formatted_address: string; // Taking one field from Google Maps PlaceResult for simplicity. Adjust as needed.
  };
  amenities: string[];
}

interface FacilityDetailProps {
  venue: FacilityItem;
}

const FacilityDetail: React.FC<FacilityDetailProps> = ({ venue }) => {
  return (
    <Box padding="4" boxShadow="lg" borderRadius="md" bg="white">
      <Heading as="h2" size="lg" marginBottom="2">
        {venue.name}
      </Heading>

      <Box marginBottom="4">
        <Icon as={FaMapMarkedAlt} marginRight="2" />
        <Text as="span">{venue.location.formatted_address}</Text>
      </Box>

      <List spacing={2}>
        {venue.amenities.map((amenity, index) => (
          <ListItem key={index}>
            {amenity}
            <Icon as={FaMapMarkedAlt} marginRight="2" /> {/* Replace with appropriate icons for each amenity */}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default FacilityDetail;