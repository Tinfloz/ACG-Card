import React, { useEffect } from 'react';
import { Box, VStack, Flex, AspectRatio, Image, HStack, IconButton } from "@chakra-ui/react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { getAllCardContentScanned } from '../reducers/card.reducer/card.slice';
import { RingLoader } from "react-spinners";
import CardContentBox from '../components/CardContentBox';
import Acg from "../assets/Acg.svg";
import { FaLinkedin, FaEnvelope } from 'react-icons/fa';


const ScannedCard = () => {

    const response = fetch("https://geolocation-db.com/json/").then(e => e.json()).catch(err => console.error(err));
    const dispatch = useDispatch();
    const { associate } = useParams();
    const contentToDisplay = useSelector(state => state.card.content);

    useEffect(() => {
        (async () => {
            const FingerprintJS = await import('https://openfpcdn.io/fingerprintjs/v4');
            const fp = await FingerprintJS.load();
            const result = await fp.get();
            const visitorId = result.visitorId;
            const finalResponse = await response;
            const sendResponse = { IPv4: finalResponse.IPv4, country: finalResponse.country_name, lat: finalResponse.latitude, lng: finalResponse.longitude }
            const userDetails = { ...sendResponse, fingerprint: visitorId };
            const details = { associate, userDetails };
            await dispatch(getAllCardContentScanned(details));
        })()
    }, [])

    return (
        <>
            <Box
                minH="100vh"
                display="grid"
                placeContent={!contentToDisplay ? "center" : null}
            >
                {!contentToDisplay ? (
                    <>
                        <RingLoader />
                    </>
                ) : (
                    <>
                        <Box
                            top="0"
                            left="0"
                            right="0"
                            bg="#d71635"
                            color="white"
                            p={4}
                            textAlign="center"
                            boxShadow="lg"
                        >
                            <Image
                                src={Acg}
                            />
                        </Box>
                        <Flex
                            minH="18vh"
                            borderBottom="1vh"
                            boxShadow="base"
                            zIndex="1"
                            alignItems="center"
                            p={4}
                            bg=""
                        >
                            <>
                                <Box
                                    width="120px" // Adjust the width as needed
                                    height="120px" // Adjust the height as needed
                                    borderRadius="50%" // Make it circular
                                    overflow="hidden" // Hide overflowing content
                                    boxShadow="base" // Add a box shadow
                                    position="relative" // Position relative for overlays
                                >
                                    <img
                                        src={contentToDisplay?.associate?.image}
                                        alt="Person"
                                        style={{
                                            width: "90%", // Make the image responsive
                                            height: "auto", // Maintain aspect ratio
                                            position: "absolute", // Position the image within the circle
                                            top: 0,
                                            left: 0,
                                        }}
                                    />
                                </Box>
                            </>
                            <Box
                                ml={5}
                                w="50%"
                            >
                                <Flex
                                    alignItems="center"
                                    as="b"
                                >
                                    {contentToDisplay?.associate?.name}
                                </Flex>
                                <Flex
                                    alignItems="center"
                                >
                                    <HStack>
                                        <IconButton
                                            as={FaLinkedin}
                                            bg="white"
                                            color="linkedin.900"
                                            _hover={{ bg: "white" }}
                                            size="sm"
                                            cursor="pointer"
                                        />
                                        <IconButton
                                            as={FaEnvelope}
                                            bg="white"
                                            color="linkedin.500"
                                            _hover={{ bg: "white" }}
                                            cursor="pointer"
                                            size="sm"
                                        />
                                    </HStack>
                                </Flex>
                            </Box>
                        </Flex>
                        <VStack
                            pt="5vh"
                            pb="15vh"
                            overflowY="scroll"
                            spacing={5}
                        >
                            {
                                contentToDisplay?.finalContentArray?.map(el => (
                                    <CardContentBox image={el} key={el._id} />
                                ))
                            }
                        </VStack>
                    </>
                )}
                <Box
                    position="fixed"
                    bottom="0"
                    left="0"
                    right="0"
                    bg="#d71635"
                    color="white"
                    p={4}
                    textAlign="center"
                    boxShadow="lg"
                    h="2%"
                    display="grid"
                    placeContent="center"
                    as="b"
                >
                    We are ACG
                </Box>
            </Box >
        </>
    )
}

export default ScannedCard