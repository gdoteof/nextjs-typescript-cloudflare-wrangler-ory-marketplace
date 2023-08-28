import React, { SetStateAction, useEffect, useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { Amenities } from '../../../../common/types/amenity';
import { Facility } from '../../../../common/types/facility';
import Select, { SingleValue } from 'react-select'
import { ActionMeta, MultiValue } from 'react-select';

import { useRouter } from 'next/navigation';
import  {useClientUserSession} from "../_hooks/useClientUserSession";
import { Configuration, FrontendApi } from '@ory/client';

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const ORY_SDK_URL = process.env.NEXT_PUBLIC_ORY_SDK_URL
const AutoComplete = dynamic(() => import('react-google-autocomplete'), {
  ssr: false,
});


const ory = new FrontendApi(
  new Configuration({
      basePath: ORY_SDK_URL,
      baseOptions: {
          withCredentials: true,
      },
  })
);

interface FacilityFormProps {
  onSubmit?: (facility: Facility) => Promise<Facility>;
}

export const AddFacilityForm: React.FC<FacilityFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState<google.maps.places.PlaceResult | null>(null);
  const [amenities, setAmenities] = useState<string[]>([]);
  const router = useRouter();
  const { session } = useClientUserSession();

  const toast = useToast();

  useEffect(() => {
    ory.toSession().then((s) => {
      console.log("session:", s);
    })
    .catch((e) => {
      console.log("No session?", e);
      return router.push(`${ORY_SDK_URL}/ui/login`);
    });
  });

  const handleSubmit = async () => {
    if (name && location) {
      const facility: Facility = {
        id: '',
        name,
        location,
        amenities,
        associatedServiceProviders: [],
      };
      if (onSubmit) {
        toast({
          title: "Facility Added",
          description: "The facility has been successfully added!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        let submitted = await onSubmit(facility);
        router.push(`/facilities/${submitted.id}`);
      }
    } else {
      toast({
        title: "Error",
        description: "Please fill out all fields before submitting.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

type LabelValuePair = {
    label: string;
    value: string;
};


const handleAmenitiesChange = async (newValue: MultiValue<{ label: string; value: string; }>, actionMeta: ActionMeta<{ label: string; value: string; }>) => {
  const { action } = actionMeta;
  console.log("new value:", newValue);
  console.log("action:", actionMeta);
  const amenitiesValues = newValue.map(item => item.value);
  setAmenities(amenitiesValues);
};




  return (
    <Box p={[2, 4]} borderWidth={1} borderRadius="md" maxWidth="600px" mx="auto">
      <FormControl mb={4}>
        <FormLabel>Name</FormLabel>
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter facility name" />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Location</FormLabel>
        <AutoComplete
          apiKey={GOOGLE_MAPS_API_KEY}
          options={{ types: [] }}
          onPlaceSelected={(place) => setLocation(place)}
          style={{ width: '100%', height: '35px', paddingLeft: '10px', borderRadius: '0.375rem' }}
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Amenities</FormLabel>
        <Select onChange={handleAmenitiesChange} options={Amenities.map(a=>({label: a, value: a}))} isMulti/>
      </FormControl>

      <Button width="100%" colorScheme="teal" onClick={handleSubmit}>Submit</Button>
    </Box>
  );
};
