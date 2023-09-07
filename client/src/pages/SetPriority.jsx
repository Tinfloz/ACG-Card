import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RingLoader } from 'react-spinners';
import { getAllTagsForSalesByLocation, resetTags } from '../reducers/tag.reducers/tag.slice';
import { useParams } from 'react-router-dom';
import { VStack, Flex, Text, Box, useBreakpointValue, Button, useMediaQuery } from '@chakra-ui/react';
import { setPrioirity } from '../reducers/tag.reducers/tag.slice';

const SetPriority = () => {

    const { location } = useParams();
    const tags = useSelector(state => state.tag.tag);
    console.log(tags, "tgs")
    const dispatch = useDispatch();
    const textFontSize = useBreakpointValue({ base: 'sm', md: 'xl' });
    const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

    const [tag, setTag] = useState(tags);

    const [reprioritisedTags, setReprioritisedTags] = useState([]);

    useEffect(() => {
        console.log("running");
        (async () => {
            await dispatch(getAllTagsForSalesByLocation(location));
        })()
    }, [])

    useEffect(() => {
        if (!tags) {
            return
        };
        setTag(prevState => tags)
    }, [tags])

    useEffect(() => {
        return () => dispatch(resetTags());
    }, [])

    return (
        <>
            <Flex
                minH="100vh"
                justify={!tags ? "center" : null}
                alignItems="center"
            >
                {
                    !tags ? (
                        <>
                            <RingLoader />
                        </>
                    ) : (
                        <>
                            <Box
                                minH="100vh"
                                w="50%"
                                bg="blue.100"
                                overflowY="scroll"
                                pt={10}
                            >
                                <VStack>
                                    {tag?.map(el => (
                                        <Text
                                            key={el._id}
                                            fontSize={textFontSize}
                                            as="button"
                                            onClick={() => {
                                                const newTagArray = tag.filter(ele => ele._id !== el._id);
                                                setTag(prevState => newTagArray);
                                                setReprioritisedTags(prevState => [...prevState, el])
                                            }}
                                        >
                                            #{el.tag}
                                        </Text>
                                    ))}
                                </VStack>
                            </Box>
                            <Box
                                minH="100vh"
                                w="50%"
                                bg="red.100"
                                overflowY="scroll"
                                pt={10}
                            >
                                <VStack>
                                    {
                                        reprioritisedTags?.map(el => (
                                            <Flex
                                                key={el._id}
                                                w="100%"
                                                justify="space-between"
                                                alignItems="center"
                                                pl={isLargerThan768 ? 20 : 2.5}
                                                pr={isLargerThan768 ? 20 : 2.5}
                                            >
                                                <Flex
                                                    fontSize={textFontSize}

                                                >
                                                    #{el.tag}
                                                </Flex>
                                                {isLargerThan768 ? (
                                                    <Button
                                                        transform="translateX(-50%)"
                                                        onClick={() => {
                                                            const newTagArray = reprioritisedTags.filter(ele => ele._id !== el._id);
                                                            setReprioritisedTags(prevState => newTagArray);
                                                            setTag(prevState => [...prevState, el])
                                                        }}
                                                    >
                                                        Remove
                                                    </Button>
                                                ) : (
                                                    <Text
                                                        fontSize="sm"
                                                        as="button"
                                                        onClick={() => {
                                                            const newTagArray = reprioritisedTags.filter(ele => ele._id !== el._id);
                                                            setReprioritisedTags(prevState => newTagArray);
                                                            setTag(prevState => [...prevState, el])
                                                        }}
                                                    >
                                                        Remove
                                                    </Text>
                                                )}
                                            </Flex>
                                        ))
                                    }
                                </VStack>
                                <Button
                                    position="absolute"
                                    bg="green.300"
                                    bottom="1rem" // Adjust the distance from the bottom as needed
                                    left="50%" // Center horizontally
                                    transform="translateX(-50%)" // Center horizontally
                                    onClick={async () => {
                                        const details = {
                                            location,
                                            priorityChange: reprioritisedTags
                                        };
                                        await dispatch(setPrioirity(details))
                                    }}
                                >
                                    Set priority
                                </Button>
                            </Box>
                        </>
                    )
                }
            </Flex>
        </>
    )
}

export default SetPriority