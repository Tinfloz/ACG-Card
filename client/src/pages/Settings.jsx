import React, { useState } from 'react';
import { Flex, Text, Box, VStack, Input, Button, useBreakpointValue } from "@chakra-ui/react";
import { useDispatch, useSelector } from 'react-redux';
import { changeUserProfileDetails } from '../reducers/auth.reducers/auth.slice';

const Settings = () => {

    const dispatch = useDispatch();

    const [details, setDetails] = useState({
        bio: ""
    });

    const inputGroupWidth = useBreakpointValue({ base: '80%', md: '100%' });
    const boxWidth = useBreakpointValue({ base: '82%', sm: '80%', md: '50%' });


    const [selectedFile, setSelectedFile] = useState(null);

    const handleChange = (e) => {
        setDetails(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };

    const handleClick = async () => {
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = async (e) => {
                const base64String = e.target.result;
                const userDetails = {
                    userPhotoStr: base64String,
                    ...details
                };
                await dispatch(changeUserProfileDetails(userDetails));
            };
            reader.readAsDataURL(selectedFile);
        }
    };


    return (
        <>
            <Flex
                bg="green.100"
                justify="center"
                alignItems="center"
                minH="100vh"
            >
                <Flex
                    justify="center"
                    alignItems="center"
                    flexDirection="column"
                    p={4}
                    w={boxWidth}
                    h="auto"
                    border="1px"
                    borderColor="gray.200"
                    borderRadius="10px"
                    bg="white"
                >
                    <VStack spacing={4} width="100%">
                        <Input type="file" w={inputGroupWidth} bg="white" onChange={handleFileChange} accept="image/*" />
                        <Input placeholder="Enter your password" name="bio" value={details.bio}
                            onChange={handleChange} bg="white" w={inputGroupWidth}
                        />
                        <Button w="50%" onClick={handleClick}>
                            Change Details
                        </Button>
                    </VStack>
                </Flex>
            </Flex>
        </>
    )
}

export default Settings