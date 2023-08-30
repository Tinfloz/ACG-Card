import React from 'react';
import { useSelector } from 'react-redux';
import { Flex } from '@chakra-ui/react';
import SetRole from '../components/SetRole';

const Dashboard = () => {

    const user = useSelector(state => state.auth.user);

    return (
        <>
            <Flex
                justify="center"
                alignItems="center"
                minH="100vh"
            >
                {
                    !user?.role ? (
                        <>
                            <SetRole />
                        </>
                    ) : (
                        <>
                            {
                                user?.role === "Marketing" ? (
                                    <>
                                    </>
                                ) : (
                                    <>
                                    </>
                                )
                            }
                        </>
                    )
                }
            </Flex>
        </>
    )
}

export default Dashboard