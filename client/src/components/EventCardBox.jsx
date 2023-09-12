import React from 'react';
import {
    Box, Text
} from '@chakra-ui/react';

const EventCardBox = ({ event }) => {
    return (
        <>
            <Box
                bg="#007BFF"
                color="white"
                py="1rem"
                textAlign="center"
                transition="transform 0.2s, box-shadow 0.2s"
                _hover={{
                    transform: "scale(1.02)",
                    boxShadow: "lg",
                }}
                // w={window.location.pathname.startsWith("/get/event") ? "80%" : "100%"}
                w="100%"
            >
                <Text
                    fontSize="1.5rem"
                    fontWeight="bold"
                >
                    {event?.eventName}
                </Text>
                <Text
                    fontSize="1rem"
                    fontWeight="semibold"
                >
                    Date: {event?.date}
                </Text>
                <Text
                    fontSize="1rem"
                    fontWeight="semibold"
                >
                    Country: {event?.location}
                </Text>
            </Box>
        </>
    )
}

export default EventCardBox