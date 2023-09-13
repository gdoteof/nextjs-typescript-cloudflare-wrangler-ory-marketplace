import { Box, Slider, SliderTrack, SliderFilledTrack, SliderThumb } from "@chakra-ui/react";

interface AvailabilityProps {
    min: number;
    max: number;
    value: number;
}

const Availability: React.FC<AvailabilityProps> = ({ min, max, value }) => {
    return (
        <Box width="300px">
            <Slider aria-label="Availability" min={min} max={max} defaultValue={value} isReadOnly>
                <SliderTrack>
                    <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb boxSize={6} />
            </Slider>
        </Box>
    );
}

export default Availability;
