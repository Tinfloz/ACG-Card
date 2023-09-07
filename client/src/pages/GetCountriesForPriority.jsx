import { Button, Flex, Select, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCountryList } from '../reducers/country.reducers/country.slice';
import { useNavigate } from 'react-router-dom';
import { RingLoader } from 'react-spinners';

const GetCountriesForPriority = () => {

    const dispatch = useDispatch();
    const countries = useSelector(state => state.country.countries);
    const navigate = useNavigate();
    const [location, setLocation] = useState("");

    useEffect(() => {
        (async () => {
            await dispatch(getCountryList());
        })()
    }, [])

    return (
        <>
            <Flex
                bg="green.100"
                justify="center"
                alignItems="center"
                minH="100vh"
            >
                {countries ? (
                    <VStack w="100%">
                        <Select
                            placeholder='Select country'
                            w="60%"
                            bg="white"
                            onChange={(e) => setLocation(prevState => e.target.value)}
                        >
                            {
                                countries?.map((el, idx) => (
                                    <option key={idx} value={el}>{el}</option>
                                ))
                            }
                        </Select>
                        <Button
                            onClick={() => navigate(`/tags/${location}`)}
                        >
                            Set priority
                        </Button>
                    </VStack>
                ) : (
                    <RingLoader />
                )}
            </Flex>
        </>
    )
}

export default GetCountriesForPriority