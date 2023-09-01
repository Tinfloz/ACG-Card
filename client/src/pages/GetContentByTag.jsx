import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMarketingCollateralsByTag, resetContent } from '../reducers/content.reducer/content.slice';
import { Flex, VStack } from "@chakra-ui/react";
import { RingLoader } from 'react-spinners';
import ContentBox from '../components/ContentBox';

const GetContentByTag = () => {

    const { tag } = useParams();
    const dispatch = useDispatch();

    const contentArray = useSelector(state => state.content.content);

    useEffect(() => {
        (async () => {
            await dispatch(getMarketingCollateralsByTag(tag));
        })()
    }, [])

    useEffect(() => {
        return () => dispatch(resetContent());
    }, [])

    return (
        <>
            <Flex
                minH="100vh"
                justify="center"
                alignItems={!contentArray ? "center" : null}
            >
                {!contentArray ? (
                    <>
                        <RingLoader />
                    </>
                ) : (
                    <>
                        <VStack
                            w="100%"
                            spacing={3}
                            align="stretch"
                            overflowY="scroll"
                            pb="15vh"
                            pt="5vh"
                        >
                            <ContentBox images={contentArray} />
                        </VStack>
                    </>
                )}
            </Flex >
        </>
    )
}

export default GetContentByTag