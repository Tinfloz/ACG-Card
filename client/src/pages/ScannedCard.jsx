import React, { useEffect, useRef, useState } from 'react';
import {
    Box, VStack, Flex, useMediaQuery, Image, HStack, Icon, Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton, useDisclosure, Heading, IconButton, DrawerFooter, Button
} from "@chakra-ui/react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { getAllCardContentScanned } from '../reducers/card.reducer/card.slice';
import { RingLoader } from "react-spinners";
import CardContentBox from '../components/CardContentBox';
import Acg from "../assets/Acg.svg";
import { FaLinkedinIn, FaEnvelope } from 'react-icons/fa';
import { BiPhoneCall } from "react-icons/bi";
import EventCardBox from '../components/EventCardBox';
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import './SmoothDivAnimation.css'
import { CSSTransition } from 'react-transition-group';

const ScannedCard = () => {

    const response = fetch("https://ipapi.co/json/").then(e => e.json()).catch(err => console.error(err));
    const dispatch = useDispatch();
    const { associate } = useParams();
    const contentToDisplay = useSelector(state => state.card.content);
    const [display, setDisplay] = useState(true);
    const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
    const btnRef = useRef();
    const changeContRef = useRef();
    const { onOpen, isOpen, onClose } = useDisclosure();

    const handleScroll = () => {
        if (changeContRef.current.scrollTop === 0) {
            setDisplay(prevState => true)
        } else {
            setDisplay(prevState => false)
        }
    }

    useEffect(() => {
        (async () => {
            const fp = await FingerprintJS.load();
            const result = await fp.get();
            const visitorId = result.visitorId;
            const finalResponse = await response;
            const sendResponse = { IPv6: finalResponse.ip, country: finalResponse.country_name, lat: finalResponse.latitude, lng: finalResponse.longitude }
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
                            // bg="#d71635"
                            bg="white"
                            color="white"
                            p={4}
                            boxShadow="lg"
                            alignItems={"center"}
                            display="flex"
                            justifyContent="space-between"
                        >
                            <Image
                                src={Acg}
                            />
                            {
                                !isLargerThan768 &&
                                <>
                                    {/* <IconButton
                                        icon={<HamburgerIcon />}
                                        variant="outline"
                                        colorScheme="white"
                                        ref={btnRef}
                                        onClick={onOpen}
                                    /> */}
                                    <Button
                                        ref={btnRef}
                                        onClick={onOpen}
                                    >
                                        Upcoming events
                                    </Button>
                                    <Drawer
                                        isOpen={isOpen}
                                        placement='right'
                                        onClose={onClose}
                                        finalFocusRef={btnRef}
                                    >
                                        <DrawerOverlay />
                                        <DrawerCloseButton />
                                        <DrawerContent>
                                            <DrawerHeader>Upcoming events</DrawerHeader>
                                            <DrawerBody>
                                                <VStack>
                                                    {
                                                        contentToDisplay?.finalEventArray?.map(el => (
                                                            <EventCardBox event={el} />
                                                        ))
                                                    }
                                                </VStack>
                                            </DrawerBody>
                                            <DrawerFooter>
                                                <Button
                                                    onClick={onClose}
                                                >
                                                    Close
                                                </Button>
                                            </DrawerFooter>
                                        </DrawerContent>
                                    </Drawer>
                                </>
                            }
                        </Box>
                        <Flex
                            minH="18vh"
                            borderBottom="1vh"
                            boxShadow="base"
                            zIndex="1"
                            alignItems="center"
                            bg="#d71635"
                            p={4}
                        >

                            <Box
                                width="120px" // Adjust the width as needed
                                height="120px" // Adjust the height as needed
                                borderRadius="50%" // Make it circular
                                overflow="hidden" // Hide overflowing content
                                boxShadow="base" // Add a box shadow
                                position="relative" // Position relative for overlays
                                display="grid"
                                placeContent="center"
                            >
                                <img
                                    src={contentToDisplay?.associate?.image}
                                    alt="Person"
                                />
                            </Box>

                            <Box
                                ml={5}
                                w="50%"
                            >
                                <Flex
                                    alignItems="center"
                                    as="b"
                                    color="white"
                                >
                                    {contentToDisplay?.associate?.name}
                                </Flex>
                                <Flex
                                    alignItems="center"
                                    as="b"
                                    color="white"
                                >
                                    {contentToDisplay?.associate?.designation}
                                </Flex>
                                <Flex
                                    alignItems="center"
                                >
                                    <HStack>
                                        <a href={contentToDisplay?.associate?.linkedIn}>
                                            <Icon
                                                as={FaLinkedinIn}
                                                bg="#d71635"
                                                color="linkedin.900"
                                                // _hover={{ bg: "white" }}
                                                boxSize={8}
                                                cursor="pointer"
                                                p={0}
                                            />
                                        </a>
                                        <a href={`mailto:${contentToDisplay?.associate?.email}`}>
                                            <Icon
                                                as={FaEnvelope}
                                                bg="#d71635"
                                                color="linkedin.500"
                                                // _hover={{ bg: "white" }}
                                                cursor="pointer"
                                                boxSize={8}
                                            />
                                        </a>
                                        <a href={`tel:+${contentToDisplay?.associate?.code}${contentToDisplay?.associate?.phone}`}>
                                            <Icon
                                                as={BiPhoneCall}
                                                bg="#d71635"
                                                color="linkedin.500"
                                                // _hover={{ bg: "white" }}
                                                cursor="pointer"
                                                boxSize={8}
                                            />
                                        </a>
                                    </HStack>
                                </Flex>
                            </Box>
                        </Flex>
                        <CSSTransition
                            in={display}
                            timeout={300} // Adjust the duration of the transition (in milliseconds)
                            classNames="fade"
                            unmountOnExit
                        >
                            <Flex
                                p={3}
                                bg="gray.50"
                            >
                                {contentToDisplay?.associate?.bio}
                            </Flex>
                        </CSSTransition>
                        <Flex
                            overflow="hidden"
                        >
                            {/* First Part */}
                            <Box
                                w={isLargerThan768 ? "70%" : "100%"}
                                overflowY="scroll"
                                ref={changeContRef}
                                onScroll={handleScroll}
                            >
                                <VStack
                                    pt="5vh"
                                    pb="15vh"
                                    spacing={5}
                                    w="100%"
                                >
                                    {
                                        contentToDisplay?.finalContentArray?.map(el => (
                                            <CardContentBox image={el} key={el._id} />
                                        ))
                                    }
                                </VStack>
                            </Box>
                            {/* Second Part */}
                            {isLargerThan768 &&
                                <Box
                                    w="30%"
                                    spacing={3}
                                    overflowY="scroll"
                                >
                                    <Box
                                        position="sticky"
                                        top="0"
                                        p={4}
                                        bg="white"
                                        boxShadow="base"
                                    >
                                        <Heading
                                            size="md"
                                            color="black"
                                        >
                                            Upcoming events
                                        </Heading>
                                    </Box>
                                    <VStack w="100%" pb="15vh" pl={3} pr={3} pt={5}>
                                        {
                                            contentToDisplay?.finalEventArray?.map(el => (
                                                <EventCardBox event={el} />
                                            ))
                                        }
                                    </VStack>
                                </Box>}
                        </Flex>
                    </>
                )
                }
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



