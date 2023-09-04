// import React from "react";
// import {
//     Box, Image,
//     useDisclosure,
//     Text
// } from "@chakra-ui/react";
// import { useDispatch, useSelector } from "react-redux";
// import { deleteMarketingCollaterals } from "../reducers/content.reducer/content.slice";

// function ContentBox({ images }) {

//     const { onOpen, isOpen, onClose } = useDisclosure();

//     const dispatch = useDispatch();

//     const handleUpload = async (id) => {
//         await dispatch(deleteMarketingCollaterals(id))
//     }

//     return (
//         <Box
//             display="flex"
//             flexWrap="wrap"
//             gap={4}
//             justifyContent="center"
//             alignItems="center"
//         >
//             {images.map((imageData, index) => (
//                 <>
//                     <Box
//                         key={index}
//                         width={{ base: "80%", md: "70%" }}
//                         padding={4}
//                         borderWidth="1px"
//                         borderRadius="lg"
//                         boxShadow="lg"
//                         display="grid"
//                         placeContent="center"
//                     >
//                         <Image src={imageData.contentStr} alt={`Image ${index}`} />
//                         <Text mt={2} fontSize="sm" color="gray.600">
//                             {imageData.caption}
//                         </Text>
//                     </Box>
//                 </>
//             ))}
//         </Box>
//     );
// }

// export default ContentBox;
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

function CardContentBox({ image }) {
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
                transition="transform 0.2s, box-shadow 0.2s"
                _hover={{
                    transform: "scale(1.02)",
                    boxShadow: "lg",
                }}
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
        </>
    );
}

export default CardContentBox