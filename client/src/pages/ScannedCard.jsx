import React, { useEffect } from 'react';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { getAllCardContentScanned } from '../reducers/card.reducer/card.slice';

const ScannedCard = () => {

    const response = fetch("https://geolocation-db.com/json/").then(e => e.json()).catch(err => console.error(err));
    const dispatch = useDispatch();
    const { associate } = useParams();
    const contentToDisplay = useSelector(state => state.card.content);

    useEffect(() => {
        (async () => {
            const FingerprintJS = await import('https://openfpcdn.io/fingerprintjs/v4');
            const fp = await FingerprintJS.load();
            const result = await fp.get();
            const visitorId = result.visitorId;
            const finalResponse = await response;
            const sendResponse = { IPv4: finalResponse.IPv4, country: finalResponse.country_name, lat: finalResponse.latitude, lng: finalResponse.longitude }
            const userDetails = { ...sendResponse, fingerprint: visitorId };
            const details = { associate, userDetails };
            await dispatch(getAllCardContentScanned(details));
        })()
    }, [])

    return (
        <></>
    )
}

export default ScannedCard