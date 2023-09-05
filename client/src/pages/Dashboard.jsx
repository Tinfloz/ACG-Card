import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Flex, VStack } from '@chakra-ui/react';
import SetRole from '../components/SetRole';
import { getAllLoggedInUserContent } from '../reducers/content.reducer/content.slice';
import CardContentBox from '../components/CardContentBox';

const Dashboard = () => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const contentArray = useSelector(state => state.content.content);
    console.log(contentArray);

    useEffect(() => {
        (async () => {
            await dispatch(getAllLoggedInUserContent())
        })()
    }, [])

    return (
        <>
            <Flex
                justify="center"
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
                                        <VStack
                                            w="100%"
                                            spacing={3}
                                            align="center"
                                            overflowY="scroll"
                                            pb="15vh"
                                            pt="5vh"
                                        >
                                            {
                                                contentArray?.map(el => (
                                                    <CardContentBox image={el} />
                                                ))
                                            }
                                        </VStack>
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