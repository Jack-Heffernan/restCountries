import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

import { Row, Col, Spinner, Image } from 'react-bootstrap';

const SingleCountry = () => {
    let { name } = useParams();

    const [country, setCountry] = useState(null);
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        axios.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
            .then(response => {
                setCountry(response.data[0]);
                fetchWeather(response.data[0].latlng[0], response.data[0].latlng[1]);
            })
            .catch(error => {
                console.error(error);
            });
    }, [name]);

    const fetchWeather = (lat, lon) => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=c9d78e516208541fb7c1de739a0dfc15`)
            .then(response => {
                setWeather(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    if (!country) {
        return <Spinner animation='grow' />;
    }

    return (
        <Row className="p-4 space-x-4">
            <Col>
                <Image src={country.flags.png} className="rounded" />
            </Col>
            <Col className="flex flex-col">
                <p className="text-2xl font-bold mb-2">{country.name.common}</p>
                <p><b>Official Name:</b> {country.name.official}</p>
                <p><b>Region:</b> {country.region}</p>
                <p><b>Sub Region:</b> {country.subregion}</p>  
                <p><b>Currency:</b> {Object.values(country.currencies)[0].name}</p>  
                <p><b>Population:</b> {country.population}</p>
                {weather && (
                    <div className="mt-4">
                        <p className="text-lg font-bold">Weather:</p>
                        <p>{weather.weather[0].description}</p>
                        <p className="mt-2"><b>Temperature:</b> {weather.main.temp} °C</p>
                    </div>
                )}
            </Col>
        </Row>
    );
};

export default SingleCountry;

