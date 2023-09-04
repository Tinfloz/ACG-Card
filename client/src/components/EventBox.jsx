import React from 'react';
import { Box, Text, Container } from '@chakra-ui/react';

const EventBox = ({ event }) => {
    return (
        <>
            <Box
                bg="#007BFF" // Background color
                color="white" // Text color
                py="1rem" // Padding on all sides
                textAlign="center" // Center align text
                w="100%"
            >
                <Text
                    fontSize="1.5rem" // Font size
                    fontWeight="bold" // Font weight
                >
                    {event?.eventName}
                </Text>
                <Text
                    fontSize="1rem" // Font size
                    fontWeight="semibold" // Font weight
                >
                    Date:{event?.date}
                </Text>
                <Text
                    fontSize="1rem" // Font size
                    fontWeight="semibold" // Font weight
                >
                    Country: {event?.location}
                </Text>
            </Box>
        </>
    )
}

export default EventBox