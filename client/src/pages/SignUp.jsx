import React from 'react';
import { Flex } from '@chakra-ui/react';
import UserCreds from '../components/UserCreds';

const SignUp = () => {
    return (
        <Flex
            justify="center"
            alignItems="center"
            minH="100vh"
        >
            <UserCreds first={true} />
        </Flex>
    )
}

export default SignUp