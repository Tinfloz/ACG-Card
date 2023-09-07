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

const NavBar = ({ user }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef();

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
                            <HStack spacing="3vh">

                                {
                                    user?.role === "Marketing" ? (
                                        <>
                                            <a
                                                href="/get/tags"
                                            >
                                                <Text as="button">My tags</Text>
                                            </a>
                                            <a
                                                href='/create/tag'
                                            >
                                                <Text as="button"> Create Tag</Text>
                                            </a>
                                            <a href="/signIn">
                                                <Text as="button"
                                                    onClick={() =>
                                                        localStorage.clear()
                                                    }
                                                >
                                                    Logout
                                                </Text>
                                            </a>
                                        </>
                                    ) : (
                                        <>
                                            <a
                                                href="/dashboard"
                                            >
                                                <Text as="button">My Page</Text>
                                            </a>
                                            <a
                                                href="/dept/tag"
                                            >
                                                <Text as="button">My Tags</Text>
                                            </a>
                                            <a href="/my/locations">
                                                <Text as="button">Prioritise Tags</Text>
                                            </a>
                                            <a
                                                href='/signIn'
                                            >
                                                <Text as="button"
                                                    onClick={() => localStorage.clear()}
                                                >
                                                    Logout
                                                </Text>
                                            </a>
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
                                                    <a href="/get/tags">
                                                        <Text as="button">My tags</Text>
                                                    </a>
                                                    <a
                                                        href="/create/tag"
                                                    >
                                                        <Text as="button"> Create Tag</Text>
                                                    </a>
                                                    <a
                                                        href="/signIn"
                                                    >
                                                        <Text as="button"
                                                            onClick={() => localStorage.clear()}
                                                        >
                                                            Logout
                                                        </Text>
                                                    </a>
                                                </>
                                            ) : (
                                                <>
                                                    <a
                                                        href="/dashboard"
                                                    >
                                                        <Text as="button">My Page</Text>
                                                    </a>
                                                    <a
                                                        href='/dept/tag'
                                                    >
                                                        <Text as="button">My Tags</Text>
                                                    </a>
                                                    <a href="/my/locations">
                                                        <Text as="button">Prioritise Tags</Text>
                                                    </a>
                                                    <a
                                                        href='/signIn'
                                                    >
                                                        <Text as="button"
                                                            onClick={() => localStorage.clear()}
                                                        >
                                                            Logout
                                                        </Text>
                                                    </a>
                                                </>
                                            )
                                        }
                                    </VStack>
                                </DrawerBody>
                            </DrawerContent>
                        </Drawer>
                    </Flex>
                </>
            )
            }
        </>
    )
}

export default NavBar;
