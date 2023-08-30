import React, { useState } from 'react';
import { departments } from '../helpers/departments';
import { Box, Button, Select, VStack, useBreakpointValue } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLoggedInUserRole } from '../reducers/auth.reducers/auth.slice';

const SetRole = () => {

    const boxWidth = useBreakpointValue({ base: '82%', sm: '80%', md: '50%' });
    // const inputGroupWidth = useBreakpointValue({ base: '100%', md: '80%' });

    const [role, setRole] = useState({
        role: ""
    });

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleClick = async () => {
        await dispatch(setLoggedInUserRole(role))
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
                    <Select
                        placeholder="Select department"
                        size="md"
                        bg="white"
                        maxH="200px"
                        onChange={(e) => setRole(prevState => ({ ...prevState, role: e.target.value }))}
                    >
                        {departments?.map((el, idx) => (<option key={idx} value={el}>{el}</option>))}
                    </Select>
                    <Button bg="blue.300"
                        onClick={async (e) => await handleClick()}
                    >
                        Set Role
                    </Button>
                </VStack>
            </Box>
        </>
    )
}

export default SetRole