import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import _ from 'lodash'; // Import lodash for debounce
import { FaSearch } from 'react-icons/fa'; // Import search icon from react-icons
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Panchang = () => {
    const [place, setPlace] = useState('');
    const [lat, setLat] = useState('');
    const [lon, setLon] = useState('');
    const [tz] = useState('5.5'); // Fixed time zone
    const [lang, setLang] = useState('en'); // Default language
    const [response, setResponse] = useState('');
    const [coordinatesFetched, setCoordinatesFetched] = useState(false); // Track if coordinates are fetched

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
                setCoordinatesFetched(true); // Mark coordinates as fetched
            } else {
                console.error('No geocoding results found.');
                setResponse('No geocoding results found.');
            }
        } catch (error) {
            console.error(`Error fetching coordinates: ${error.message}`);
            setResponse(`Error fetching coordinates: ${error.message}`);
        }
    }, 1000); // Adjust debounce time as needed (e.g., 1000 ms = 1 second)

    useEffect(() => {
        if (place.trim() !== '') {
            debouncedFetchLatLon(place); // Call debounced function on place change
        }
    }, [place]);

    const fetchPanchang = async () => {
        const formattedDate = moment().format('DD/MM/YYYY'); // Use today's date
        console.log(`Formatted date: ${formattedDate}`);

        const api_key = process.env.REACT_APP_VEDIC_ASTRO_API_KEY;
        const url = `${process.env.REACT_APP_VEDIC_ASTRO_BASE_URL}/panchang/panchang`;

        console.log(`Making request to Panchang API with lat: ${lat}, lon: ${lon}`);

        try {
            const result = await axios.get(url, {
                params: {
                    api_key,
                    date: formattedDate,
                    lat,
                    lon,
                    tz,
                    lang,
                },
            });
            console.log('Panchang API response:', result.data);

            if (result.data.status === 200 && result.data.response) {
                // Display entire response data
                setResponse(JSON.stringify(result.data.response, null, 2));
            } else {
                setResponse('Unexpected response format.');
            }
        } catch (error) {
            console.error(`Error: ${error.message}`);
            setResponse(`Error: ${error.message}`);
        }
    };

    const handleSearch = async () => {
        if (coordinatesFetched && lat && lon) {
            await fetchPanchang();
        } else {
            setResponse('Latitude and Longitude are missing. Please ensure the place is correctly entered.');
        }
    };

    return (
        <div className="container-fluid py-5 bg-light">
            <ToastContainer />
            <div className="container">
                <div className="section-title text-center position-relative pb-3 mb-5 mx-auto" style={{ maxWidth: '700px' }}>
                    <h3 className="fw-bold text-primary text-uppercase mb-3" style={{ fontSize: '30px' }}>Panchang Lookup</h3>
                    <h3 className="mb-0">Enter a place and select a language to fetch Panchang details.</h3>
                </div>
                <div className="row g-5 mb-5 justify-content-center">
                    <div className="col-md-4">
                        <div className="mb-4">
                            <label htmlFor="place" className="form-label">Place:</label>
                            <input
                                type="text"
                                id="place"
                                className="form-control"
                                placeholder="Place"
                                value={place}
                                onChange={(e) => {
                                    setPlace(e.target.value);
                                    setCoordinatesFetched(false); // Reset fetching status when place changes
                                }}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="lang" className="form-label">Select Language:</label>
                            <select
                                id="lang"
                                className="form-select"
                                value={lang}
                                onChange={(e) => setLang(e.target.value)}
                            >
                                <option value="en">English</option>
                                <option value="hi">Hindi</option>
                            </select>
                        </div>
                        <div className="text-center">
                            <button className="btn btn-primary py-3 px-5" onClick={handleSearch}>
                                Search
                            </button>
                        </div>
                    </div>
                    <div className="col-md-8">
                        {response && (
                            <div className="wow slideInUp" data-wow-delay="0.6s">
                                <h5 className="mb-3">Panchang:</h5>
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

export default Panchang;
