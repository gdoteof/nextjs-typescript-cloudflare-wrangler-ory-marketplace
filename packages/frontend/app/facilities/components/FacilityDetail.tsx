import React, { useState } from "react";
import { Box, Heading, Text, Icon, List, ListItem, Editable, EditableInput, EditablePreview, FormControl, FormLabel, Button } from "@chakra-ui/react";
import { FaMapMarkedAlt } from "react-icons/fa";

interface FacilityItem {
  name: string;
  location: {
    formatted_address: string;
  };
  amenities: string[];
}

interface FacilityDetailProps {
  venue: FacilityItem;
  onEdit: (updatedVenue: FacilityItem) => void;
}

const FacilityDetail: React.FC<FacilityDetailProps> = ({ venue, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editableVenue, setEditableVenue] = useState(venue);

  const handleNameChange = (newValue: string) => {
    setEditableVenue({ ...editableVenue, name: newValue });
  };

  const handleAddressChange = (newValue: string) => {
    setEditableVenue({ ...editableVenue, location: { formatted_address: newValue } });
  };

  const handleSaveChanges = () => {
    onEdit(editableVenue);
    setIsEditing(false);
  };

  return (
    <Box padding="4" boxShadow="lg" borderRadius="md" bg="white">
      <Heading as="h2" size="lg" marginBottom="2">
        {isEditing ? (
          <Editable value={editableVenue.name} onSubmit={handleNameChange}>
            <EditablePreview />
            <EditableInput />
          </Editable>
        ) : (
          venue.name
        )}
      </Heading>

      <Box marginBottom="4">
        <Icon as={FaMapMarkedAlt} marginRight="2" />
        {isEditing ? (
          <Editable value={editableVenue.location.formatted_address} onSubmit={handleAddressChange}>
            <EditablePreview />
            <EditableInput />
          </Editable>
        ) : (
          <Text as="span">{venue.location.formatted_address}</Text>
        )}
      </Box>

      <List spacing={2}>
        {venue.amenities.map((amenity, index) => (
          <ListItem key={index}>
            {amenity}
            <Icon as={FaMapMarkedAlt} marginRight="2" />
          </ListItem>
        ))}
      </List>

      {isEditing ? (
        <Button onClick={handleSaveChanges} colorScheme="blue" size="sm" mt={4}>
          Save Changes
        </Button>
      ) : (
        <Button onClick={() => setIsEditing(true)} size="sm" mt={4}>
          Edit
        </Button>
      )}
    </Box>
  );
};

export default FacilityDetail;
