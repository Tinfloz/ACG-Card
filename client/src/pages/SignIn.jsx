import React from 'react';
import { Flex } from "@chakra-ui/react";
import UserCreds from '../components/UserCreds';
import bgimage from "../assets/12232.jpg"

const SignIn = () => {
    return (
        <>
            <Flex
                justify="center"
                alignItems="center"
                minH="100vh"
                bgImg={bgimage}
                bgSize="cover"
                bgPosition="center"
                bgRepeat="no-repeat"
                h="100vh"
            >
                <UserCreds first={false} />
            </Flex>
        </>
    )
}

export default SignIn