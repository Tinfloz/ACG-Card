import React, { useEffect, useState } from 'react';
import { Flex, Box, Text, VStack, Input, Button, useBreakpointValue } from "@chakra-ui/react";
import { resetAuthHelpers, login, register } from '../reducers/auth.reducers/auth.slice';
import { useDispatch } from 'react-redux';

const UserCreds = ({ first }) => {
    const boxWidth = useBreakpointValue({ base: '82%', sm: '80%', md: '50%' });

    const dispatch = useDispatch();

    const [creds, setCreds] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setCreds(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const handleClick = async () => {
        first ? await dispatch(register(creds)) : await dispatch(login(creds));
        setCreds(prevState => ({ ...prevState, email: "", password: "" }))
    }

    return (
        <>
            <Box
                w={boxWidth}
                h="auto"
                border="1px"
                borderColor="gray.200"
                borderRadius="2px"
                m="auto"
            >
                <Flex
                    justify="center"
                    alignItems="center"
                    h='20%'
                    borderBottom="1px"
                    borderBottomColor="gray.200"
                >
                    <Text as="b">
                        {first ? "Register to ACG Card" : "Login to use ACG Card"}
                    </Text>
                </Flex>
                <Flex
                    justify="center"
                    alignItems="center"
                    flexDirection="column"
                    p={4}
                >
                    <VStack spacing={4} width="100%">
                        <Input placeholder="Enter your email" w="100%" name="email" value={creds.email}
                            onChange={handleChange}
                        />
                        <Input placeholder="Enter your password" w="100%" name="password" value={creds.password}
                            onChange={handleChange}
                        />
                        <Button w="50%" onClick={handleClick}>
                            {first ? "Register" : "Login"}
                        </Button>
                    </VStack>
                </Flex>
            </Box>
        </>
    )
}

export default UserCreds;