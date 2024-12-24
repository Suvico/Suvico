import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { FaSearch } from 'react-icons/fa';
import _ from 'lodash';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dosha = () => {
    const [subCategory, setSubCategory] = useState('mangal-dosh');
    const [dob, setDob] = useState('');
    const [tob, setTob] = useState('');
    const [place, setPlace] = useState('');
    const [lat, setLat] = useState('');
    const [lon, setLon] = useState('');
    const [tz] = useState('5.5'); // Fixed time zone
    const [lang, setLang] = useState('en'); // Default language
    const [response, setResponse] = useState('');
    const [coordinatesFetched, setCoordinatesFetched] = useState(false);

    // Debounce function to handle place input
    const debouncedFetchLatLon = _.debounce(async (place) => {
        if (place.trim() === '') return;

        const api_key = process.env.REACT_APP_OLAMAPS_API_KEY; // Replace with your actual API key
        const url = `${process.env.REACT_APP_OLAMAPS_BASE_URL}/geocode?address=${encodeURIComponent(place)}&language=English&api_key=${api_key}`;

        console.log(`Fetching latitude and longitude for place: ${place}`);
        console.log(`Request URL: ${url}`);

        try {
            const result = await axios.get(url);
            console.log('API response:', result.data);

            if (result.data.geocodingResults.length > 0) {
                const { lat, lng } = result.data.geocodingResults[0].geometry.location;
                console.log(`Fetched latitude: ${lat}, longitude: ${lng}`);

                setLat(lat);
                setLon(lng);
                setCoordinatesFetched(true);
            } else {
                console.error('No geocoding results found.');
                setResponse('No geocoding results found.');
            }
        } catch (error) {
            console.error(`Error fetching coordinates: ${error.message}`);
            setResponse(`Error fetching coordinates: ${error.message}`);
        }
    }, 1000); // Adjust debounce time as needed

    useEffect(() => {
        if (place.trim() !== '') {
            debouncedFetchLatLon(place);
        }
    }, [place]);

    const fetchDoshaData = async () => {
        if (!dob || !tob || !lat || !lon) {
            setResponse('Please provide all required fields: Date of Birth, Time of Birth, Latitude, Longitude.');
            return;
        }

        const formattedDob = moment(dob).format('DD/MM/YYYY'); // Format DOB using moment
        const api_key = process.env.REACT_APP_VEDIC_ASTRO_API_KEY;
        const url = `${process.env.REACT_APP_VEDIC_ASTRO_BASE_URL}/dosha/${subCategory}`;

        console.log(`Making request to Dosha API with dob: ${formattedDob}, tob: ${tob}, lat: ${lat}, lon: ${lon}`);

        try {
            const result = await axios.get(url, {
                params: {
                    api_key,
                    dob: formattedDob,
                    tob,
                    lat,
                    lon,
                    tz,
                    lang,
                },
            });
            console.log('Dosha API response:', result.data);

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
        if (coordinatesFetched) {
            await fetchDoshaData();
        } else {
            toast.error('Latitude and Longitude are missing. Please ensure the place is correctly entered.');
        }
    };

    const handleDateChange = (e) => {
        setDob(e.target.value);
    };

    const handleTimeChange = (e) => {
        setTob(e.target.value);
    };

    const handlePlaceChange = (e) => {
        setPlace(e.target.value);
        setCoordinatesFetched(false); // Reset fetching status when place changes
    };

    const handleLangChange = (e) => {
        setLang(e.target.value);
    };

    return (
        <div className="container-fluid py-5 bg-light">
            <ToastContainer />
            <div className="container">
                <div className="section-title text-center position-relative pb-3 mb-5 mx-auto" style={{ maxWidth: '700px' }}>
                    <h3 className="fw-bold text-primary text-uppercase mb-3" style={{ fontSize: '30px' }}>Dosha Lookup</h3>
                    <h3 className="mb-0">Enter your details to check for Doshas.</h3>
                </div>
                <div className="row g-5 mb-5 justify-content-center">
                    <div className="col-md-6">
                        <div className="mb-4">
                            <label htmlFor="subCategory" className="form-label">Select Dosha:</label>
                            <select
                                id="subCategory"
                                className="form-select"
                                value={subCategory}
                                onChange={(e) => setSubCategory(e.target.value)}
                            >
                                <option value="mangal-dosh">Mangal Dosh</option>
                                <option value="kaalsarp-dosh">Kaalsarp Dosh</option>
                                <option value="manglik-dosh">Manglik Dosh</option>
                                <option value="pitra-dosh">Pitra Dosh</option>
                                <option value="papasamaya">Papasamaya</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="place" className="form-label">Place:</label>
                            <input
                                type="text"
                                id="place"
                                className="form-control"
                                value={place}
                                onChange={handlePlaceChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="dob" className="form-label">Date of Birth:</label>
                            <input
                                type="date"
                                id="dob"
                                className="form-control"
                                value={dob}
                                onChange={handleDateChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="tob" className="form-label">Time of Birth:</label>
                            <input
                                type="time"
                                id="tob"
                                className="form-control"
                                value={tob}
                                onChange={handleTimeChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="lang" className="form-label">Select Language:</label>
                            <select
                                id="lang"
                                className="form-select"
                                value={lang}
                                onChange={handleLangChange}
                            >
                                <option value="en">English</option>
                                <option value="hi">Hindi</option>
                            </select>
                        </div>
                        <div className="text-center">
                            <button
                                className="btn btn-primary py-3 px-5"
                                onClick={handleSearch}
                            >
                          Search
                            </button>
                        </div>
                    </div>
                    <div className="col-md-6">
                        {response && (
                            <div className="wow slideInUp" data-wow-delay="0.6s">
                                <h5 className="mb-3">Dosha Details:</h5>
                                <pre style={{
                                    backgroundColor: '#f8f9fa',
                                    padding: '15px',
                                    borderRadius: '8px',
                                    border: '1px solid #dee2e6',
                                    maxHeight: '400px',
                                    overflowY: 'auto'
                                }}>
                                    {response}
                                </pre>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dosha;
