import React from 'react';
import {
    Box, Text, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure, Button
} from '@chakra-ui/react';
import { deleteMarketingEvent } from '../reducers/event.reducers/event.slice';
import { useDispatch } from 'react-redux';

const EventBox = ({ event }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const dispatch = useDispatch();

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
                w={window.location.pathname.startsWith("/get/event") ? "80%" : "100%"}
                as={window.location.pathname.startsWith("/get/event") ? "button" : null}
                onClick={onOpen}
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
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent maxW="90%">
                    <ModalHeader>Delete Collateral</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Are you sure you want to delete this event?
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            colorScheme="red"
                            onClick={async () => {
                                await dispatch(deleteMarketingEvent(event._id));
                                onClose();
                            }}
                        >
                            Delete
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default EventBox