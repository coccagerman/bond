import { useState } from 'react';
import FlightOption from './FlightOption'

function AvailableDepartureFlights ({flightSearchParams, searchFlights, setSectionShown, setChosenDepartureFlight, chosenDepartureFlight, typeOfTripSwitch, setTypeOfTripSwitch}) {

    // Hook used to hold the results of the flight search done
    const [availableDepartureFlightsList, setAvailableDepartureFlightsList] = useState(searchFlights(flightSearchParams[0], flightSearchParams[1], flightSearchParams[2], flightSearchParams[3]));

    // Function that displays the flight search results
    const showFlights = () => {
        if (
            (flightSearchParams[0] === 'COR' && flightSearchParams[1] === 'COR') ||
            (flightSearchParams[0] === 'COR' && flightSearchParams[1] === 'EPA') ||
            (flightSearchParams[0] === 'EPA' && flightSearchParams[1] === 'EPA') ||
            (flightSearchParams[0] === 'EPA' && flightSearchParams[1] === 'COR') ||
            (flightSearchParams[0] === 'EPA' && flightSearchParams[1] === 'MDZ') ||
            (flightSearchParams[0] === 'MDZ' && flightSearchParams[1] === 'MDZ') ||
            (flightSearchParams[0] === 'MDZ' && flightSearchParams[1] === 'BRC') ||
            (flightSearchParams[0] === 'MDZ' && flightSearchParams[1] === 'EPA') ||
            (flightSearchParams[0] === 'BRC' && flightSearchParams[1] === 'BRC') ||
            (flightSearchParams[0] === 'BRC' && flightSearchParams[1] === 'MDZ')
        ) {
            return <p>Lo sentimos, no tenemos vuelos disponibles con las parámetros seleccionados.</p>
        } else {
            return availableDepartureFlightsList.map((item) => (
                <article>
                    <FlightOption data={item.data} origin={item.origin} destination={item.destination} price={item.price} availability={item.availability} setSectionShown={setSectionShown} setChosenDepartureFlight={setChosenDepartureFlight} chosenDepartureFlight={chosenDepartureFlight} typeOfTripSwitch={typeOfTripSwitch} flightSearchParams={flightSearchParams} />
                </article>
              ))
        }
    }

    // Function that changes the section back to InitialForm
    function handleSearchAgain(e) {
        e.preventDefault();
        setTypeOfTripSwitch(0)
        setSectionShown('InitialForm')
    }

    return (
        <div className='searchResult'>
            <h1>Resultados de búsqueda para ...(parámetros de búsqueda)</h1>
            <h2>Vuelos disponibles:</h2>
            {showFlights()}
            <button className='btn btn-secondary' onClick={(e) => handleSearchAgain(e)}>Search again</button>
        </div>
    )
}

export default AvailableDepartureFlights