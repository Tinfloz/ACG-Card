import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    Box, Flex, useBreakpointValue,
    Text, Button, Input, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure, Select,
    VStack, useMediaQuery
} from "@chakra-ui/react"
import { useDispatch } from 'react-redux';
import { deleteTags } from '../reducers/tag.reducers/tag.slice';
import { createMarketingCollateral } from "../reducers/content.reducer/content.slice";
import Calendar from "react-calendar";
import { countryList } from '../helpers/countries';
import { createNewMarketingEvent } from '../reducers/event.reducers/event.slice';
import { useNavigate } from 'react-router-dom';

const CreateContentOrDeleteTag = () => {

    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null);
    const [caption, setCaption] = useState("");
    const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
    const [event, setEvent] = useState("");
    const [date, setDate] = useState(new Date());
    const [location, setLocation] = useState("");
    const { tagName } = useParams();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleUpload = async () => {
        if (selectedFile) {
            const reader = new FileReader();

            reader.onload = async (e) => {
                const base64String = e.target.result;
                const content = {
                    contentDetails: {
                        contentStr: base64String,
                        caption
                    },
                    tag: tagName
                }
                await dispatch(createMarketingCollateral(content))
                onClose();
            };

            reader.readAsDataURL(selectedFile);
        };
    };

    const handleChange = (e) => {
        setLocation(prevState => e.target.value)
    };

    const boxWidth = useBreakpointValue({ base: '82%', sm: '80%', md: '50%' });
    const size = useBreakpointValue({ base: "xl", sm: "3xl" })
    const buttonSize = useBreakpointValue({ base: 'sm', md: 'md', lg: 'lg' });

    const { isOpen, onOpen, onClose } = useDisclosure();

    const dispatch = useDispatch();

    const handleDeleteClick = async () => {
        await dispatch(deleteTags(tagName))
    };

    const handleCreateEvent = async () => {
        const dateString = date.toString().split(" ");
        const finalDateString = dateString[0] + " " + dateString[1] + " " + dateString[2] + " " + dateString[3];
        const eventDetails = {
            eventName: event,
            date: finalDateString,
            location,
            tag: tagName
        };
        await dispatch(createNewMarketingEvent(eventDetails));
        onClose();
        setEvent(prevState => "");
        setLocation(prevState => "");
    };

    return (
        <>
            <Flex
                justify="center"
                alignItems="center"
                minH="100vh"
            >
                <Box
                    w={boxWidth}
                    h="50%"
                    bg="gray.100"
                >
                    <Box
                        h="50%"
                        bg="yellow.100"
                    >
                        <Flex
                            w="100%"
                            h="50%"
                            justify="center"
                            alignItems="center"
                        >
                            <Text
                                as="b"
                                fontSize={size}
                            >
                                #{tagName}
                            </Text>
                        </Flex>
                        <Flex
                            w="100%"
                            h="50%"
                        // justify="center"
                        // alignItems="center"
                        >
                            <Flex
                                justify="center"
                                alignItems="center"
                                w="50%"
                            >
                                <Button
                                    size={buttonSize}
                                    onClick={() => navigate(`/get/content/${tagName}`)}
                                >
                                    Collaterals
                                </Button>
                            </Flex>
                            <Flex
                                justify="center"
                                alignItems="center"
                                w="50%"

                            >
                                <Button
                                    size={buttonSize}
                                    onClick={() => navigate(`/get/event/${tagName}`)}
                                >
                                    Events
                                </Button>
                            </Flex>
                        </Flex>
                    </Box>
                    <Flex
                        h="50%"
                        bg="blue.100"
                    >
                        <Flex
                            bg="red.100"
                            justify="center"
                            alignItems="center"
                            w="33.34%"
                        >
                            <Button
                                size={buttonSize}
                                fontSize="sm"
                                onClick={async () => await handleDeleteClick()}
                            >
                                {isLargerThan768 ? "Delete Tag" : "Delete"}

                            </Button>
                        </Flex>
                        <Flex
                            bg="green.100"
                            justify="center"
                            alignItems="center"
                            w="33.34%"
                        >
                            <Button
                                size={buttonSize}
                                fontSize="sm"
                                onClick={onOpen}
                            >
                                {isLargerThan768 ? "Create Content" : "Content"}
                            </Button>
                            <Modal isOpen={isOpen} onClose={onClose}>
                                <ModalOverlay />
                                <ModalContent maxW={['90%', '80%', '60%']}>
                                    <ModalHeader>Upload Image</ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody>
                                        <VStack
                                            spacing={4}
                                        >
                                            <Input type="file" onChange={handleFileChange} accept="image/*" />
                                            <Input placeholder="Enter caption" value={caption} onChange={(e) => setCaption(e.target.value)} />
                                        </VStack>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button colorScheme="blue" onClick={handleUpload} isDisabled={!selectedFile}>
                                            Upload
                                        </Button>
                                    </ModalFooter>
                                </ModalContent>
                            </Modal>
                        </Flex>
                        <Flex
                            bg="blue.100"
                            justify="center"
                            alignItems="center"
                            w="33.34%"
                        >
                            <Button
                                size={buttonSize}
                                fontSize="sm"
                                onClick={onOpen}
                            >
                                {isLargerThan768 ? "Create Event" : "Event"}
                            </Button>
                            <Modal isOpen={isOpen} onClose={onClose}>
                                <ModalOverlay />
                                <ModalContent maxW={['90%', '80%', '60%']}>
                                    <ModalHeader>Create Event</ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody>
                                        <VStack
                                            spacing={4}
                                        >
                                            <Input placeholder="Event name" value={event} onChange={(e) => setEvent(prevState => e.target.value)} />
                                            <Select
                                                placeholder="Select location"
                                                onChange={handleChange}
                                            >
                                                {
                                                    countryList.map(el => (
                                                        <option value={el}>{el}</option>
                                                    ))
                                                }
                                            </Select>
                                            <Calendar
                                                onChange={setDate} value={date}
                                            />
                                        </VStack>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button colorScheme="blue" onClick={async () => await handleCreateEvent()}>
                                            Create
                                        </Button>
                                    </ModalFooter>
                                </ModalContent>
                            </Modal>
                        </Flex>
                    </Flex>
                </Box>
            </Flex>
        </>
    )
}

export default CreateContentOrDeleteTag