import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import _ from 'lodash';
import { FaSearch } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MatchMaking = () => {
    const [boyData, setBoyData] = useState({
        dob: '',
        tob: '',
        place: '',
        tz: '5.5' // Added default time zone for boy
    });

    const [girlData, setGirlData] = useState({
        dob: '',
        tob: '',
        place: '',
        tz: '5.5' // Added default time zone for girl
    });

    const [lang, setLang] = useState('en');
    const [response, setResponse] = useState('');
    const [coordinatesFetched, setCoordinatesFetched] = useState({ boy: false, girl: false });

    const debouncedFetchLatLon = _.debounce(async (place, person) => {
        if (place.trim() === '') return;

        const api_key = process.env.REACT_APP_OLAMAPS_API_KEY;
        const url = `${process.env.REACT_APP_OLAMAPS_BASE_URL}/geocode?address=${encodeURIComponent(place)}&language=English&api_key=${api_key}`;

        try {
            const result = await axios.get(url);

            if (result.data.geocodingResults.length > 0) {
                const { lat, lng } = result.data.geocodingResults[0].geometry.location;

                if (person === 'boy') {
                    setBoyData(prevState => ({ ...prevState, lat, lon: lng }));
                    setCoordinatesFetched(prevState => ({ ...prevState, boy: true }));
                } else if (person === 'girl') {
                    setGirlData(prevState => ({ ...prevState, lat, lon: lng }));
                    setCoordinatesFetched(prevState => ({ ...prevState, girl: true }));
                }
            } else {
                toast.error('No geocoding results found.');
            }
        } catch (error) {
            toast.error(`Error fetching coordinates: ${error.message}`);
        }
    }, 1000);

    useEffect(() => {
        if (boyData.place.trim() !== '') {
            debouncedFetchLatLon(boyData.place, 'boy');
        }
    }, [boyData.place]);

    useEffect(() => {
        if (girlData.place.trim() !== '') {
            debouncedFetchLatLon(girlData.place, 'girl');
        }
    }, [girlData.place]);

    const fetchMatchMaking = async () => {
        const api_key = process.env.REACT_APP_VEDIC_ASTRO_API_KEY;
        const url = `${process.env.REACT_APP_VEDIC_ASTRO_BASE_URL}/matching/ashtakoot`;

        try {
            const result = await axios.get(url, {
                params: {
                    api_key,
                    lang,
                    boy_dob: moment(boyData.dob).format('DD/MM/YYYY'),
                    boy_tob: boyData.tob,
                    boy_lat: boyData.lat,
                    boy_lon: boyData.lon,
                    boy_tz: boyData.tz, // Include time zone for boy
                    girl_dob: moment(girlData.dob).format('DD/MM/YYYY'),
                    girl_tob: girlData.tob,
                    girl_lat: girlData.lat,
                    girl_lon: girlData.lon,
                    girl_tz: girlData.tz, // Include time zone for girl
                },
            });

            if (result.data.status === 200 && result.data.response) {
                setResponse(JSON.stringify(result.data.response, null, 2));
            } else {
                toast.error('Unexpected response format.');
            }
        } catch (error) {
            toast.error(`Error: ${error.message}`);
        }
    };

    const handleSearch = async () => {
        if (coordinatesFetched.boy && coordinatesFetched.girl) {
            await fetchMatchMaking();
        } else {
            toast.error('Latitude and Longitude are missing. Please ensure the places are correctly entered.');
        }
    };

    const handleInputChange = (e, person) => {
        const { name, value } = e.target;
        if (person === 'boy') {
            setBoyData(prevState => ({ ...prevState, [name]: value }));
            if (name === 'place') setCoordinatesFetched(prevState => ({ ...prevState, boy: false }));
        } else if (person === 'girl') {
            setGirlData(prevState => ({ ...prevState, [name]: value }));
            if (name === 'place') setCoordinatesFetched(prevState => ({ ...prevState, girl: false }));
        }
    };

    const handleLangChange = (e) => {
        setLang(e.target.value);
    };

    return (
        <div className="container-fluid py-5 bg-light">
            <ToastContainer />
            <div className="container">
                <div className="section-title text-center position-relative pb-3 mb-5 mx-auto" style={{ maxWidth: '700px' }}>
                    <h3 className="fw-bold text-primary text-uppercase mb-3" style={{ fontSize: '30px' }}>Match Making</h3>
                    <h3 className="mb-0">Enter details for both boy and girl to fetch the matching results.</h3>
                </div>
                <div className="row g-5 mb-5 justify-content-center">
                    <div className="col-md-6">
                        <h4 className="mb-4">Boy's Details</h4>
                        <div className="mb-4">
                            <label htmlFor="boy-dob" className="form-label">Date of Birth:</label>
                            <input
                                type="date"
                                id="boy-dob"
                                className="form-control"
                                name="dob"
                                value={boyData.dob}
                                onChange={(e) => handleInputChange(e, 'boy')}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="boy-tob" className="form-label">Time of Birth:</label>
                            <input
                                type="time"
                                id="boy-tob"
                                className="form-control"
                                name="tob"
                                value={boyData.tob}
                                onChange={(e) => handleInputChange(e, 'boy')}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="boy-place" className="form-label">Place:</label>
                            <input
                                type="text"
                                id="boy-place"
                                className="form-control"
                                name="place"
                                value={boyData.place}
                                onChange={(e) => handleInputChange(e, 'boy')}
                            />
                        </div>
                        {/* Hidden Time Zone */}
                        <input
                            type="hidden"
                            name="tz"
                            value={boyData.tz}
                        />
                    </div>
                    <div className="col-md-6">
                        <h4 className="mb-4">Girl's Details</h4>
                        <div className="mb-4">
                            <label htmlFor="girl-dob" className="form-label">Date of Birth:</label>
                            <input
                                type="date"
                                id="girl-dob"
                                className="form-control"
                                name="dob"
                                value={girlData.dob}
                                onChange={(e) => handleInputChange(e, 'girl')}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="girl-tob" className="form-label">Time of Birth:</label>
                            <input
                                type="time"
                                id="girl-tob"
                                className="form-control"
                                name="tob"
                                value={girlData.tob}
                                onChange={(e) => handleInputChange(e, 'girl')}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="girl-place" className="form-label">Place:</label>
                            <input
                                type="text"
                                id="girl-place"
                                className="form-control"
                                name="place"
                                value={girlData.place}
                                onChange={(e) => handleInputChange(e, 'girl')}
                            />
                        </div>
                        {/* Hidden Time Zone */}
                        <input
                            type="hidden"
                            name="tz"
                            value={girlData.tz}
                        />
                    </div>
                </div>
                <div className="mb-4 text-center">
                    <label htmlFor="language" className="form-label">Select Language:</label>
                    <select id="language" className="form-select" value={lang} onChange={handleLangChange}>
                        <option value="en">English</option>
                        <option value="hi">Hindi</option>
                        {/* Add more languages if needed */}
                    </select>
                </div>
                <div className="text-center">
                    <button className="btn btn-primary" onClick={handleSearch}>
                        Search
                    </button>
                </div>
                {response && (
                    <div className="mt-4">
                        <h5 className="mb-3">Match Making Result:</h5>
                        <pre>{response}</pre>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MatchMaking;
