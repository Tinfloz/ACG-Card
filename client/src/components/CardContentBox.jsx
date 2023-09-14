import React from "react";
import {
    Box, Image,
    Text,
} from "@chakra-ui/react";

function CardContentBox({ image }) {

    const redirectToExternalWebsite = () => {
        const externalURL = 'https://cloud.info-acg.acg-world.com/pharma-pro-pack-cs16'; // Replace with the URL you want to redirect to
        window.location.href = externalURL;
    };

    return (
        <>
            <Box
                key={image._id}
                width={{ base: "90%", md: "45%" }} // Adjust the width values as needed
                padding="1rem"
                borderWidth="1px"
                // borderRadius="lg"
                borderRadius="md"
                // boxShadow="md"
                position="relative"
            // transition="transform 0.2s, box-shadow 0.2s"
            // _hover={{
            //     transform: "scale(1.02)",
            //     boxShadow: "lg",
            // }}
            >
                <Image
                    src={image.contentStr}
                    alt={`Image ${image._id}`}
                    width="100%"
                    height="auto"
                    borderRadius="lg"
                />
                <Text mt={2} fontSize="sm" color="gray.600" fontWeight="bold" as="button" onClick={redirectToExternalWebsite}>
                    {/* {image.caption}
                         */}
                    Learn more
                </Text>
            </Box>
        </>
    );
};

export default CardContentBox