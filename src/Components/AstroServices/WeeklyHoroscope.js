import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { FaSearch } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WeeklyHoroscope = () => {
    const [zodiac, setZodiac] = useState('1'); // Default zodiac (Aries)
    const [lang, setLang] = useState('en'); // Default language (English)
    const [week, setWeek] = useState('thisweek'); // Default week ("thisweek")
    const [response, setResponse] = useState('');

    const zodiacOptions = [
        { name: 'Aries', value: '1' },
        { name: 'Taurus', value: '2' },
        { name: 'Gemini', value: '3' },
        { name: 'Cancer', value: '4' },
        { name: 'Leo', value: '5' },
        { name: 'Virgo', value: '6' },
        { name: 'Libra', value: '7' },
        { name: 'Scorpio', value: '8' },
        { name: 'Sagittarius', value: '9' },
        { name: 'Capricorn', value: '10' },
        { name: 'Aquarius', value: '11' },
        { name: 'Pisces', value: '12' },
    ];

    const weekOptions = [
        { name: 'This Week', value: 'thisweek' },
        { name: 'Next Week', value: 'nextweek' },
    ];

    const fetchWeeklyHoroscope = async () => {
        const api_key = process.env.REACT_APP_VEDIC_ASTRO_API_KEY;
        const url = 'https://api.vedicastroapi.com/v3-json/prediction/weekly-sun';

        try {
            const result = await axios.get(url, {
                params: {
                    lang,
                    api_key,
                    zodiac,
                    split: true,
                    show_same: true,
                    type: 'small',
                    week,
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
        await fetchWeeklyHoroscope();
    };

    const handleZodiacChange = (e) => {
        setZodiac(e.target.value);
    };

    const handleLangChange = (e) => {
        setLang(e.target.value);
    };

    const handleWeekChange = (e) => {
        setWeek(e.target.value);
    };

    return (
        <div className="container-fluid py-5 bg-light">
            <ToastContainer />
            <div className="container">
                <div className="section-title text-center position-relative pb-3 mb-5 mx-auto" style={{ maxWidth: '700px' }}>
                    <h3 className="fw-bold text-primary text-uppercase mb-3" style={{ fontSize: '30px' }}>Weekly Horoscope</h3>
                    <h3 className="mb-0">Select your zodiac sign, language, and week to view the weekly horoscope.</h3>
                </div>
                <div className="row g-5 mb-5 justify-content-center">
                    <div className="col-md-4">
                        <div className="mb-4">
                            <label htmlFor="zodiac" className="form-label">Select Zodiac Sign:</label>
                            <select
                                id="zodiac"
                                className="form-select"
                                value={zodiac}
                                onChange={handleZodiacChange}
                            >
                                {zodiacOptions.map(option => (
                                    <option key={option.value} value={option.value}>{option.name}</option>
                                ))}
                            </select>
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
                        <div className="mb-4">
                            <label htmlFor="week" className="form-label">Select Week:</label>
                            <select
                                id="week"
                                className="form-select"
                                value={week}
                                onChange={handleWeekChange}
                            >
                                {weekOptions.map(option => (
                                    <option key={option.value} value={option.value}>{option.name}</option>
                                ))}
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
                                <h5 className="mb-3">Weekly Horoscope:</h5>
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

export default WeeklyHoroscope;
