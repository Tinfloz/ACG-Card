import React, { useState } from 'react';
import { departments } from '../helpers/departments';
import { Box, Button, Select, VStack, useBreakpointValue, Input } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLoggedInUserRole } from '../reducers/auth.reducers/auth.slice';

const SetRole = () => {

    const boxWidth = useBreakpointValue({ base: '82%', sm: '80%', md: '50%' });
    const inputGroupWidth = useBreakpointValue({ base: '80%', md: '100%' });

    const [role, setRole] = useState({
        role: ""
    });

    const [selectedFile, setSelectedFile] = useState(null);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleClick = async () => {
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = async (e) => {
                const base64String = e.target.result;
                const userDetails = {
                    userPhotoStr: base64String,
                    role: role.role
                };
                await dispatch(setLoggedInUserRole(userDetails));
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    }

    return (
        <>
            <Box
                w={boxWidth}
                h="40%"
                border="1px"
                borderColor="gray.200"
                borderRadius="2px"
                m="auto"
                display="grid"
                placeContent="center"
                bg="gray.100"
            >
                <VStack>
                    <Input type="file" w={inputGroupWidth} bg="white" onChange={handleFileChange} accept="image/*" />
                    <Select
                        placeholder="Select department"
                        size="md"
                        bg="white"
                        maxH="200px"
                        onChange={(e) => setRole(prevState => ({ ...prevState, role: e.target.value }))}
                        w={inputGroupWidth}
                    >
                        {departments?.map((el, idx) => (<option key={idx} value={el}>{el}</option>))}
                    </Select>
                    <Button bg="blue.300"
                        onClick={async (e) => await handleClick()}
                    >
                        Upload Details
                    </Button>
                </VStack>
            </Box >
        </>
    )
}

export default SetRole