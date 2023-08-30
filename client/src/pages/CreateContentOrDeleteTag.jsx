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
    useDisclosure
} from "@chakra-ui/react"
import { useDispatch } from 'react-redux';
import { deleteTags } from '../reducers/tag.reducers/tag.slice';
import { createMarketingCollateral } from "../reducers/content.reducer/content.slice"

const CreateContentOrDeleteTag = () => {

    const [selectedFile, setSelectedFile] = useState(null);

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
                    contentStr: base64String,
                    tag: tagName
                }
                await dispatch(createMarketingCollateral(content))
                onClose();
            };

            reader.readAsDataURL(selectedFile);
        }
    };



    const boxWidth = useBreakpointValue({ base: '82%', sm: '80%', md: '50%' });
    const size = useBreakpointValue({ base: "xl", sm: "3xl" })
    const buttonSize = useBreakpointValue({ base: 'sm', md: 'md', lg: 'lg' });

    const { isOpen, onOpen, onClose } = useDisclosure();

    const dispatch = useDispatch();

    const handleDeleteClick = async () => {
        await dispatch(deleteTags(tagName))
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
                    <Flex
                        h="50%"
                        bg="yellow.100"
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
                        h="50%"
                        bg="blue.100"
                    >
                        <Flex
                            bg="red.100"
                            justify="center"
                            alignItems="center"
                            w="50%"
                        >
                            <Button
                                size={buttonSize}
                                fontSize="sm"
                                onClick={async () => await handleDeleteClick()}
                            >
                                Delete Tag
                            </Button>
                        </Flex>
                        <Flex
                            bg="green.100"
                            justify="center"
                            alignItems="center"
                            w="50%"
                        >
                            <Button
                                size={buttonSize}
                                fontSize="sm"
                                onClick={onOpen}
                            >
                                Create Content
                            </Button>
                            <Modal isOpen={isOpen} onClose={onClose}>
                                <ModalOverlay />
                                <ModalContent maxW={['90%', '80%', '60%']}>
                                    <ModalHeader>Upload Image</ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody>
                                        <Input type="file" onChange={handleFileChange} accept="image/*" />
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button colorScheme="blue" onClick={handleUpload} isDisabled={!selectedFile}>
                                            Upload
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