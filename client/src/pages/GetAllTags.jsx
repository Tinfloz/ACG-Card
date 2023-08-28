import React, { useEffect } from 'react';
import { Flex } from "@chakra-ui/react";
import Cloud from '../components/Cloud';
import { useDispatch, useSelector } from 'react-redux';
import { RingLoader } from "react-spinners"
import { getAllTags, resetTags } from '../reducers/tag.reducers/tag.slice';

const GetAllTags = () => {

    const dispatch = useDispatch();
    const tag = useSelector(state => state.tag.tag);
    console.log(tag, "n")

    useEffect(() => {
        (async () => {
            await dispatch(getAllTags())
        })()
    }, [])

    useEffect(() => {
        return () => dispatch(resetTags())
    }, [])

    return (
        <>
            <Flex
                justify="center"
                alignItems="center"
                minH="100vh"
            >
                {/* <Cloud /> */}
                {
                    !tag ? (
                        <>
                            <RingLoader />
                        </>
                    ) : (
                        <>
                            <Cloud words={tag} />
                        </>
                    )
                }
            </Flex>
        </>
    )
}

export default GetAllTags