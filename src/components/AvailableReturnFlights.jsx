import { useState } from 'react';
import ReturnFlightOption from './ReturnFlightOption'
import FlightOption from './FlightOption'

function AvailableReturnFlights ({flightSearchParams, searchFlights, setSectionShown, setChosenReturnFlight, chosenReturnFlight, chosenDepartureFlight, setTypeOfTripSwitch}) {

    // Hook used to store the results of the flight search done
    const [availableReturnFlightsList, setAvailableReturnFlightsList] = useState(searchFlights(flightSearchParams[1], flightSearchParams[0], flightSearchParams[2], flightSearchParams[4]));

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
            return availableReturnFlightsList.map((item) => (
                <article className='flightOption'>
                    <ReturnFlightOption data={item.data} origin={item.origin} destination={item.destination} price={item.price} availability={item.availability} setSectionShown={setSectionShown} setChosenReturnFlight={setChosenReturnFlight} chosenReturnFlight={chosenReturnFlight} />
                </article>
              ))
        }
    }

    // Function that returns to AvailableFlights section when ReturnToSearchResults is pressed
    function handleReturnToSearchResults(e) {
        e.preventDefault();
        setSectionShown('AvailableFlights')
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

            <h2>Vuelo de ida seleccionado:</h2>
            <article className="flight flightSelected">
                <div className="row row1">
                    <p><span className="label">Fecha:</span> {chosenDepartureFlight[0]}</p>
                    <p><span className="label">Origen:</span> {chosenDepartureFlight[1]}</p>
                    <p><span className="label">Destino:</span> {chosenDepartureFlight[2]}</p>
                </div>
                <div className="row row2">
                    <p><span className="label">Availability:</span>  {chosenDepartureFlight[4]}</p>
                    <p><span className="label">Precio:</span> $ {chosenDepartureFlight[3]}</p>
                    <button className="btn btn-secondary" onClick={(e) => handleReturnToSearchResults(e)}>Modificar</button>
                </div>
            </article>

            <h2>Vuelos de vuelta disponibles:</h2>
            {showFlights()}
            <button className='btn btn-secondary' onClick={(e) => handleSearchAgain(e)}>Search again</button>
        </div>
    )
}

export default AvailableReturnFlights