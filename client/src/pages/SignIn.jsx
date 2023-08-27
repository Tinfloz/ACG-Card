import React from 'react';
import { Flex } from "@chakra-ui/react";
import UserCreds from '../components/UserCreds';

const SignIn = () => {
    return (
        <>
            <Flex
                justify="center"
                alignItems="center"
                minH="100vh"
            >
                <UserCreds first={false} />
            </Flex>
        </>
    )
}

export default SignIn