import React from 'react';
import { Box, Flex } from "@chakra-ui/react"

const VideoBoxComp = ({ src }) => {
    return (
        <Flex
            h="100vh"
            justify="center"
            align="center"
        >
            <Box
                width={{ base: "90%", md: "45%" }}
                padding="1rem"
                borderWidth="1px"
                borderRadius="md"
                boxShadow="lg"
                position="relative"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
            >
                <video width="100%" controls>
                    <source src={src} />
                </video>
            </Box>
        </Flex>
    )
}

export default VideoBoxComp