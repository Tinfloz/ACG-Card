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
                {/* <video width="100%" controls>
                    {/* <source src={"https://www.youtube.com/watch?v=yCLqAoUjR7I"} /> */}
                {/* </video> */}
                <iframe width="400" height="300" src={src} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </Box>
        </Flex >
    )
}

export default VideoBoxComp

// "https://www.youtube.com/embed/yCLqAoUjR7I?si=JB1mLrxlaaeekp-o"