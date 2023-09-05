import React, { useEffect } from 'react';
import { Flex, VStack } from "@chakra-ui/react";
import { RingLoader } from 'react-spinners';
import { useDispatch, useSelector } from 'react-redux';
import { getMyMarketingEvents, resetEvent } from '../reducers/event.reducers/event.slice';
import { useParams } from 'react-router-dom';
import EventBox from '../components/EventBox';

const GetEventsByTag = () => {

    const { tag } = useParams();
    const dispatch = useDispatch();
    const eventArray = useSelector(state => state.event.event);

    useEffect(() => {
        (async () => {
            await dispatch(getMyMarketingEvents(tag));
        })()
    }, [dispatch])

    useEffect(() => {
        return () => dispatch(resetEvent());
    }, [dispatch])

    return (
        <>
            <Flex
                minH="100vh"
                justify="center"
                alignItems={!eventArray ? "center" : null}
            >
                {
                    !eventArray ? (
                        <>
                            <RingLoader />
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
                                    eventArray?.map(el => (
                                        <EventBox event={el} />
                                    ))
                                }
                            </VStack>
                        </>
                    )
                }
            </Flex>
        </>
    )
}

export default GetEventsByTag