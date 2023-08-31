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
    Button
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { deleteMarketingCollaterals } from "../reducers/content.reducer/content.slice";

function ContentBox({ images }) {

    const { onOpen, isOpen, onClose } = useDisclosure();

    const dispatch = useDispatch();

    const handleUpload = async (id) => {
        await dispatch(deleteMarketingCollaterals(id))
    }

    return (
        <Box
            display="flex"
            flexWrap="wrap"
            gap={4}
            justifyContent="center"
            alignItems="center"
        >
            {images.map((imageData, index) => (
                <>
                    <Box
                        key={index}
                        width={{ base: "80%", md: "70%" }}
                        padding={4}
                        borderWidth="1px"
                        borderRadius="lg"
                        boxShadow="lg"
                        as="button"
                        onClick={onOpen}
                        display="grid"
                        placeContent="center"
                    >
                        <Image src={imageData.contentStr} alt={`Image ${index}`} />
                    </Box>
                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent maxW={['90%', '80%', '60%']}>
                            <ModalHeader>Delete collateral</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                Are you sure you want to delete this collateral?
                            </ModalBody>
                            <ModalFooter>
                                <Button colorScheme="blue" onClick={async () => {
                                    onClose();
                                    await handleUpload(imageData._id);
                                }}>
                                    Delete
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </>
            ))}
        </Box>
    );
}

export default ContentBox;
