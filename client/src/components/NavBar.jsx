import React, { useRef } from 'react';
import {
    Flex, Box,
    IconButton,
    useDisclosure,
    Spacer,
    VStack,
    HStack, Text,
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useBreakpointValue,
} from "@chakra-ui/react";
import { HamburgerIcon } from '@chakra-ui/icons';
import { useParams } from 'react-router-dom';

const NavBar = ({ user }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef();
    const { associate } = useParams();

    // Check if the screen size is small (base) to determine whether to show the drawer
    const isSmallScreen = useBreakpointValue({ base: true, md: false });

    return (
        <>
            {!user || window.location.pathname.startsWith("/scanned/card") ? (
                null
            ) : (
                <>
                    <Flex align="center" bg="teal.500" p={4} h="auto">
                        {isSmallScreen ? ( // Display hamburger icon on small screens
                            <Box display={{ base: 'block', md: 'none' }}>
                                <IconButton
                                    icon={<HamburgerIcon />}
                                    ref={btnRef}
                                    onClick={onOpen}
                                    variant="outline"
                                    colorScheme="white"
                                />
                            </Box>
                        ) : ( // Display menu contents on large screens
                            <HStack spacing="2.5vh">

                                {
                                    user?.role === "Marketing" ? (
                                        <>
                                            <Text as="button">My tags</Text>
                                            <Text as="button">Content</Text>
                                            <Text as="button">Events</Text>
                                            <Text as="button">Logout</Text>
                                        </>
                                    ) : (
                                        <>
                                            <Text as="button">My Page</Text>
                                            <Text as="button">My Tags</Text>
                                        </>
                                    )
                                }
                            </HStack>
                        )}
                        <Spacer />
                        <Drawer
                            isOpen={isOpen}
                            placement='left'
                            onClose={onClose}
                            finalFocusRef={btnRef}
                        >
                            <DrawerOverlay />
                            <DrawerCloseButton />
                            <DrawerContent>
                                <DrawerHeader>Menu</DrawerHeader>
                                <DrawerBody>
                                    <VStack>
                                        {
                                            user?.role === "Marketing" ? (
                                                <>
                                                    <Text as="button">My tags</Text>
                                                    <Text as="button">Content</Text>
                                                    <Text as="button">Events</Text>
                                                    <Text as="button">Logout</Text>
                                                </>
                                            ) : (
                                                <>
                                                    <Text as="button">My Page</Text>
                                                    <Text as="button">My Tags</Text>
                                                </>
                                            )
                                        }
                                    </VStack>
                                </DrawerBody>
                            </DrawerContent>
                        </Drawer>
                    </Flex>
                </>
            )}
        </>
    )
}

export default NavBar;
