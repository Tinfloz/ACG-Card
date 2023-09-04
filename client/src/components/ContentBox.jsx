import React from "react";
import {
    Box, Image, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Text,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { deleteMarketingCollaterals } from "../reducers/content.reducer/content.slice";

function ContentBox({ image }) {
    const { onOpen, isOpen, onClose } = useDisclosure();
    const dispatch = useDispatch();

    const handleDelete = async (id) => {
        await dispatch(deleteMarketingCollaterals(id));
        onClose();
    };

    return (
        <>
            <Box
                key={image._id}
                width={{ base: "70%", md: "45%" }} // Adjust the width values as needed
                padding="1rem"
                borderWidth="1px"
                borderRadius="lg"
                boxShadow="md"
                position="relative"
                cursor="pointer"
                transition="transform 0.2s, box-shadow 0.2s"
                _hover={{
                    transform: "scale(1.02)",
                    boxShadow: "lg",
                }}
                onClick={onOpen}
            >
                <Image
                    src={image.contentStr}
                    alt={`Image ${image._id}`}
                    width="100%"
                    height="auto"
                    borderRadius="lg"
                />
                <Text mt={2} fontSize="sm" color="gray.600" fontWeight="bold">
                    {image.caption}
                </Text>
            </Box>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent maxW="90%">
                    <ModalHeader>Delete Collateral</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Are you sure you want to delete this collateral?
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            colorScheme="red"
                            onClick={() => handleDelete(image._id)}
                        >
                            Delete
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default ContentBox;

