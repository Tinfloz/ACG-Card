import React from 'react';
import {
    Box, Text, Grid, useBreakpointValue, Modal,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const WordBox = ({ words }) => {

    const navigate = useNavigate();

    const buttonFontSize = useBreakpointValue({ base: 'sm', md: 'md' });

    return (
        <Box
            p={4}
            border="1px"
            borderColor="gray.300"
            borderRadius="md"
            w="60%"
            maxW="500px"
            h="300px"
            overflowY="auto"
            bg="gray.100"
        >
            <Grid templateColumns="repeat(4, 1fr)" gap={2}>
                {words.map((el) => (
                    <Text
                        key={el._id}
                        as="button"
                        fontSize={buttonFontSize}
                        onClick={() => navigate(`/tag/${el.tag}`)}
                    >
                        #{el.tag}
                    </Text>
                ))}
            </Grid>
        </Box>
    );
};

export default WordBox;
