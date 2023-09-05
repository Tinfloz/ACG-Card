import React, { useEffect, useState } from 'react';
import { Flex, Box, Text, VStack, Input, Button, useBreakpointValue, Select } from "@chakra-ui/react";
import { resetAuthHelpers, login, register } from '../reducers/auth.reducers/auth.slice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

const UserCreds = ({ first }) => {
    const boxWidth = useBreakpointValue({ base: '82%', sm: '80%', md: '50%' });

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const user = useSelector(state => state.auth.user);
    console.log(user);

    const [creds, setCreds] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setCreds(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const handleClick = async () => {
        first ? await dispatch(register(creds)) : await dispatch(login(creds));
        navigate("/dashboard");
        setCreds(prevState => ({ ...prevState, email: "", password: "" }));
    }

    return (
        <>
            <Box
                w={boxWidth}
                h="auto"
                border="1px"
                borderColor="gray.200"
                borderRadius="2px"
                backgroundColor="rgba(0, 0, 0, 0.65)"
                m="auto"
            >
                <Flex
                    justify="center"
                    alignItems="center"
                    h='20%'
                    borderBottom="1px"
                    borderBottomColor="gray.200"
                >
                    <Text as="b" color="white">
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
                            onChange={handleChange} color="white"
                        />
                        <Input placeholder="Enter your password" w="100%" name="password" value={creds.password}
                            onChange={handleChange} color="white"
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