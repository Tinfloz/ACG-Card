import React, { useState, useEffect } from 'react';
import { Box, Flex, Select, Text, useBreakpointValue, VStack, InputGroup, InputLeftAddon, Input, HStack, Button } from "@chakra-ui/react";
import { useDispatch } from 'react-redux';
import { createNewTag, resetTagHelpers, resetTags } from '../reducers/tag.reducers/tag.slice';
import { countryList } from '../helpers/countries';

const CreateTag = () => {

    const textFontSize = useBreakpointValue({ base: 'sm', md: 'lg' });
    const padding = useBreakpointValue({ base: '4', md: '4' });
    const inputGroupWidth = useBreakpointValue({ base: '90%', md: '80%' });
    const hStackSpacing = useBreakpointValue({ base: '2', md: '4' });

    const dispatch = useDispatch();
    const [tagDetails, setTagDetails] = useState({
        tagName: "",
    });

    const [location, setLocation] = useState("")

    const handleClick = async () => {
        const tagInfo = { ...tagDetails, location }
        await dispatch(createNewTag(tagInfo));
    }

    useEffect(() => {
        return () => dispatch(resetTags())
    }, [])

    const handleChange = (e) => {
        setLocation(prevState => e.target.value)
    };

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
                    <VStack>
                        <HStack spacing={hStackSpacing} justifyContent="center">
                            <InputGroup w={inputGroupWidth}>
                                <InputLeftAddon children='#' />
                                <Input placeholder='Enter tag' bg="white" name="tagName" value={tagDetails.tagName} onChange={(e) => setTagDetails(prevState => ({
                                    ...prevState, tagName: e.target.value
                                }))} />
                            </InputGroup>
                        </HStack>
                        <Select
                            placeholder="Select a country"
                            size="md"
                            bg="white"
                            w={inputGroupWidth}
                            maxH="200px"
                            onChange={handleChange}
                        >
                            {
                                countryList.map(el => (
                                    <option value={el}>{el}</option>
                                ))
                            }
                        </Select>
                        <Button
                            onClick={handleClick}
                        >
                            Submit
                        </Button>
                    </VStack>
                </Flex>
            </Box>
        </>
    )
}

export default CreateTag