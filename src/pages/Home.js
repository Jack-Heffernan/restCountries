import { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Button } from 'react-bootstrap';


import CountryCard from '../components/CountryCard';

const restURL = 'https://restcountries.com/v3.1';

const Home = () => {

    const [countriesList, setCountriesList] = useState([]);
    const [term, setTerm] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState('');
    const [regions, setRegions] = useState([]);

    useEffect(() => {
        axios.get(`${restURL}/all`)
        .then(response => {
            console.log(response.data);
            setCountriesList(response.data);
            setRegions([...new Set(response.data.map(country => country.region))]);
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
        
        if(e.key === 'Enter'){
            searchCountry();
        }
        
    }

    const handleRegionChange = (region) => {
        setSelectedRegion(region);
        if (region === 'All') {
            getAll();
        } else {
            filterByRegion(region);
        }
    };


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
    };

    const filterByRegion = (region) => {
        axios.get(`${restURL}/region/${region}`)
            .then((response) => {
                setCountriesList(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    let countryCards = countriesList.map((country, i) => {
        return <CountryCard key={i} flag={country.flags.png} name={country.name.common} region={country.region} />;
    });

    
    return (
        <>
        <div className="search m-4">
            <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" value={term} onChange={handleChange} onKeyUp={handleKeyUp}/>
            <Button variant="Secondary" onClick={handleReset}>Reset</Button>

            <div className="dropdown dropdown-bottom dropdown-end float-end">
                    <label label tabIndex={0} className="btn m-1">Region</label>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a onClick={() => handleRegionChange('All')}>All</a></li>
                        {regions.map((region, i) => (
                            <li key={region}><a onClick={() => handleRegionChange(region)}>{region}</a></li>
                        ))}
                    </ul>
                </div>
</div>

        
        <Row className='mt-2 m-4' md={3} xs={1}>
            {countryCards}
        </Row>
        </>
    );
};

export default Home;