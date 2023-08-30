import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Flex, useBreakpointValue, Text, Button } from "@chakra-ui/react"
import { useDispatch } from 'react-redux';
import { deleteTags } from '../reducers/tag.reducers/tag.slice';

const CreateContentOrDeleteTag = () => {

    const { tagName } = useParams();
    const boxWidth = useBreakpointValue({ base: '82%', sm: '80%', md: '50%' });
    const size = useBreakpointValue({ base: "xl", sm: "3xl" })
    const buttonSize = useBreakpointValue({ base: 'sm', md: 'md', lg: 'lg' });

    const dispatch = useDispatch();

    const handleDeleteClick = async () => {
        await dispatch(deleteTags(tagName))
    };

    return (
        <>
            <Flex
                justify="center"
                alignItems="center"
                minH="100vh"
            >
                <Box
                    w={boxWidth}
                    h="50%"
                    bg="gray.100"
                >
                    <Flex
                        h="50%"
                        bg="yellow.100"
                        justify="center"
                        alignItems="center"
                    >
                        <Text
                            as="b"
                            fontSize={size}
                        >
                            #{tagName}
                        </Text>
                    </Flex>
                    <Flex
                        h="50%"
                        bg="blue.100"
                    >
                        <Flex
                            bg="red.100"
                            justify="center"
                            alignItems="center"
                            w="50%"
                        >
                            <Button
                                size={buttonSize}
                                fontSize="sm"
                                onClick={async () => await handleDeleteClick()}
                            >
                                Delete Tag
                            </Button>
                        </Flex>
                        <Flex
                            bg="green.100"
                            justify="center"
                            alignItems="center"
                            w="50%"
                        >
                            <Button
                                size={buttonSize}
                                fontSize="sm"
                            >
                                Create Content
                            </Button>
                        </Flex>
                    </Flex>
                </Box>
            </Flex>
        </>
    )
}

export default CreateContentOrDeleteTag