import React, { useState, useEffect } from 'react';
import { Box, Flex, Text, useBreakpointValue, InputGroup, InputLeftAddon, Input, HStack, Button } from "@chakra-ui/react";
import { useDispatch } from 'react-redux';
import { createNewTag, resetTagHelpers, resetTags } from '../reducers/tag.reducers/tag.slice';

const CreateTag = () => {

    const textFontSize = useBreakpointValue({ base: 'sm', md: 'lg' });
    const padding = useBreakpointValue({ base: '4', md: '4' });
    const inputGroupWidth = useBreakpointValue({ base: '90%', md: '80%' });
    const hStackSpacing = useBreakpointValue({ base: '2', md: '4' });

    const dispatch = useDispatch();
    const [tagDetails, setTagDetails] = useState({
        tagName: ""
    });

    const handleClick = async () => {
        await dispatch(createNewTag(tagDetails));
    }

    useEffect(() => {
        return () => dispatch(resetTags())
    }, [])

    return (
        <>
            <Box
                minH="100vh"
            >
                <Flex
                    h="50%"
                    bg="red.100"
                    justify="center"
                    alignItems="center"
                    p={padding}
                >
                    <Text fontSize={textFontSize}>
                        Innovate your marketing game with the creation of sizzling, brand-new tags, designed to spark electrifying events and fuel a content revolution! 🚀🌟
                    </Text>
                </Flex>
                <Flex
                    h="50%"
                    bg="blue.100"
                    justify="center"
                    alignItems="center"
                >
                    <HStack spacing={hStackSpacing} justifyContent="center">
                        <InputGroup w={inputGroupWidth}>
                            <InputLeftAddon children='#' />
                            <Input placeholder='Enter tag' bg="white" name="tagName" value={tagDetails.tagName} onChange={(e) => setTagDetails(prevState => ({
                                ...prevState, tagName: e.target.value
                            }))} />
                        </InputGroup>
                        <Button
                            onClick={handleClick}
                        >
                            Submit
                        </Button>
                    </HStack>
                </Flex>
            </Box>
        </>
    )
}

export default CreateTag