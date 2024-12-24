import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { FaSearch } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Numerology = () => {
    const [name, setName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [lang, setLang] = useState('en'); // Default language
    const [response, setResponse] = useState('');

    const fetchNumerology = async () => {
        const api_key = process.env.REACT_APP_VEDIC_ASTRO_API_KEY;
        const url = `${process.env.REACT_APP_VEDIC_ASTRO_BASE_URL}/prediction/numerology`;

        // Format the date using moment
        const formattedDate = moment(dateOfBirth).format('DD/MM/YYYY');
        console.log(`Formatted date: ${formattedDate}`);

        try {
            const result = await axios.get(url, {
                params: {
                    lang,
                    api_key,
                    name,
                    date: formattedDate,
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
        if (!name || !dateOfBirth) {
            toast.error('Please provide both name and date of birth.');
            return;
        }
        await fetchNumerology();
    };

    const handleDateChange = (e) => {
        setDateOfBirth(e.target.value);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleLangChange = (e) => {
        setLang(e.target.value);
    };

    return (
        <div className="container-fluid py-5 bg-light">
            <ToastContainer />
            <div className="container">
                <div className="section-title text-center position-relative pb-3 mb-5 mx-auto" style={{ maxWidth: '700px' }}>
                    <h3 className="fw-bold text-primary text-uppercase mb-3" style={{ fontSize: '30px' }}>Numerology Details</h3>
                    <h3 className="mb-0">Enter your name and date of birth to fetch numerology details.</h3>
                </div>
                <div className="row g-5 mb-5 justify-content-center">
                    <div className="col-md-6">
                        <div className="mb-4">
                            <label htmlFor="name" className="form-label">Name:</label>
                            <input
                                type="text"
                                id="name"
                                className="form-control"
                                value={name}
                                onChange={handleNameChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="dob" className="form-label">Date of Birth:</label>
                            <input
                                type="date"
                                id="dob"
                                className="form-control"
                                value={dateOfBirth}
                                onChange={handleDateChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="language" className="form-label">Select Language:</label>
                            <select
                                id="language"
                                className="form-select"
                                value={lang}
                                onChange={handleLangChange}
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
                    <div className="col-md-6">
                        {response && (
                            <div className="wow slideInUp" data-wow-delay="0.6s">
                                <h5 className="mb-3">Numerology Details:</h5>
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

export default Numerology;
