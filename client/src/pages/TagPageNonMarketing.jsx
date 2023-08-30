import React, { useEffect, useState } from 'react';
import { Button, Box, Grid, Flex, HStack, Select, VStack, useBreakpointValue } from '@chakra-ui/react';
import { useSelector, useDispatch } from "react-redux"
import { getAllTags, resetTags } from '../reducers/tag.reducers/tag.slice';
import { RingLoader } from 'react-spinners';
import { subscribeUserTags, unsubscribeUserTags } from "../reducers/auth.reducers/auth.slice"

const TagPageNonMarketing = () => {

    const dispatch = useDispatch();

    const user = useSelector(state => state.auth.user);
    const tags = useSelector(state => state.tag.tag);

    console.log(tags)

    const textFontSize = useBreakpointValue({ base: 'xx-small', md: 'xl' });
    const selectSize = useBreakpointValue({ base: "85%", md: "60%" })

    const displayUnSubscribedtags = () => {
        const itrArray = user?.subscribedTags?.map(el => el?._id?.toString());
        const newTagArray = tags.filter(el => {
            if (!itrArray.includes(el._id)) {
                return el
            };
        });
        return newTagArray;
    }

    const handleSubscribeClick = async () => {
        await dispatch(subscribeUserTags(subscribedTag))
    };


    const [subscribedTag, setSubscribedTag] = useState({
        tagName: ""
    });

    const [unsubscribeTag, setUnsubscribeTag] = useState({
        tagName: ""
    });

    const handleUnsubscribeClick = async () => {
        await dispatch(unsubscribeUserTags(unsubscribeTag));
    }

    useEffect(() => {
        (async () => {
            await dispatch(getAllTags());
        })()
    }, [])

    useEffect(() => {
        return () => resetTags()
    }, [])

    return (
        <>

            {
                !tags ? (
                    <>
                        <Flex
                            minH="100vh"
                            justify="center"
                            alignItems="center"
                        >
                            <RingLoader />
                        </Flex>
                    </>
                ) : (
                    <>
                        <Flex
                            minH="100vh"
                        >
                            <Flex
                                // h="50%"
                                w="50%"
                                minH="100vh"
                                bg="green.100"
                                justify="center"
                                alignItems="center"
                            >
                                <VStack w="100%">
                                    <Select placeholder="Select tag" w={selectSize} bg="gray.100"
                                        onChange={(e) => setSubscribedTag(prevState => ({
                                            ...prevState,
                                            tagName: e.target.value
                                        }))}
                                    >
                                        {
                                            displayUnSubscribedtags().map(el => (
                                                <option key={el._id} value={el.tag}>{el.tag}</option>
                                            ))
                                        }
                                    </Select>
                                    <Button fontSize={textFontSize}
                                        onClick={async () => await handleSubscribeClick()}
                                    >
                                        Subcribe
                                    </Button>
                                </VStack>
                            </Flex>
                            <Flex
                                // h="50%"
                                w="50%"
                                minH="100vh"
                                bg="red.100"
                                justify="center"
                                alignItems="center"
                            >
                                <VStack w="100%">
                                    <Select placeholder="Select tag" w={selectSize} bg="gray.100"
                                        onChange={(e) => setUnsubscribeTag(prevState => ({
                                            ...prevState,
                                            tagName: e.target.value
                                        }))}
                                    >
                                        {
                                            user?.subscribedTags?.map((el, idx) => (
                                                <option key={idx} value={el.tag}>{el.tag}</option>
                                            ))
                                        }
                                    </Select>
                                    <Button fontSize={textFontSize}
                                        onClick={async () => await handleUnsubscribeClick()}
                                    >
                                        Unsubcribe
                                    </Button>
                                </VStack>
                            </Flex>
                        </Flex >
                    </>
                )
            }
        </>
    )
}

export default TagPageNonMarketing