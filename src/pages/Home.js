import { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Button } from 'react-bootstrap';


import CountryCard from '../components/CountryCard';

const restURL = 'https://restcountries.com/v3.1';

const Home = () => {

    const [countriesList, setCountriesList] = useState([]);
    const [term, setTerm] = useState([]);

    useEffect(() => {
        axios.get(`${restURL}/all`)
        .then(response => {
            console.log(response.data);
            setCountriesList(response.data);
        })
        .catch(error => {
            console.error(error);
        });

    }, []);

    const handleChange = (e) => {
        setTerm(e.target.value)
    };

    const handleReset = () => {
        getAll();
    };

    const handleKeyUp = (e) => {
        // run axios get gifs by search term
        if(e.key === 'Enter'){
            searchCountry();
        }
        
    }

    const searchCountry = () => {

        if(!term){
            alert("Please enter a search term");
            return;
        }

        axios.get(`${restURL}/name/${term}`)
        .then((response) => {
           console.log(response.data);
           setCountriesList(response.data);
        })
        .catch((error) => {
           console.log(error);
        });
    }

    const getAll = () => {

        axios.get(`${restURL}/all`)
             .then((response) => {
                console.log(response.data);
                setCountriesList(response.data);
             })
             .catch((error) => {
                console.log(error);
             });
    }

    let countryCards = countriesList.map((country, i) => {
        return <CountryCard key={i} flag={country.flags.png} name={country.name.common} region={country.region} />;
    });

    return (
        <>
        <div className="search m-4">
            <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" value={term} onChange={handleChange} onKeyUp={handleKeyUp}/>
            <Button variant="Secondary" onClick={handleReset}>Reset</Button>
        </div>
        
        <Row className='mt-2 m-4' md={3} xs={1}>
            {countryCards}
        </Row>
        </>
    );
};

export default Home;