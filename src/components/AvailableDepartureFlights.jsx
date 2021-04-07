import { useState } from 'react';
import FlightOption from './DepartureFlightOption'
import ErrorMessageNoAvailableFlights from './ErrorMessageNoAvailableFlights'

function AvailableDepartureFlights ({flightSearchParams, searchFlights, setSectionShown, setChosenDepartureFlight, chosenDepartureFlight, typeOfTripSwitch, formatPlaces, handleSearchAgain}) {

    // Hook used to hold the results of the departure flight search done
    const [availableDepartureFlightsList, setAvailableDepartureFlightsList] = useState(searchFlights(flightSearchParams[0], flightSearchParams[1], flightSearchParams[2], flightSearchParams[3], flightSearchParams[5]));

    // Function that displays the flight search results
    const showFlights = () => {
        if (availableDepartureFlightsList.length === 0) {
            return <ErrorMessageNoAvailableFlights/>
        } else {
            return availableDepartureFlightsList.map((item) => (
                <article>
                    <FlightOption data={item.data} origin={item.origin} destination={item.destination} price={item.price} totalPrice={item.price*flightSearchParams[2]} passengers={flightSearchParams[2]} setSectionShown={setSectionShown} setChosenDepartureFlight={setChosenDepartureFlight} chosenDepartureFlight={chosenDepartureFlight} typeOfTripSwitch={typeOfTripSwitch} flightSearchParams={flightSearchParams} formatPlaces={formatPlaces}/>
                </article>
              ))
        }
    }

    // Function used to display a different search tittle wether the trip desired is one way or round
    function typeOfSearchTittle () {
        if (typeOfTripSwitch%2 === 1) {
            return 'de ida'
        } else {
            return null
        }
    }

    // Function used to display a different price search parameter depending on the param entered in the search form
    function priceParam () {
        if (flightSearchParams[5] === '1000') {
            return 'Hasta $1000'
        } else if (flightSearchParams[5] === '800') {
            return 'Hasta $800' 
        } else if (flightSearchParams[5] === '400') {
            return 'Hasta $400'
        } else {
            return 'Hasta $200'
        }
    }



    return (
        <div className='searchResult'>
            <article className="flight searchParameters">
            <h2>Resultados de búsqueda para:</h2>
                <div className="row row1">
                    <p><span className="label">Fecha de salida:</span> {flightSearchParams[3]}</p>
                    <p><span className="label">Fecha de retorno:</span> {typeOfTripSwitch%2 === 0 ? 'N/A' : flightSearchParams[4]}</p>
                    <p><span className="label">Origen:</span> {flightSearchParams[0] === '' ? 'N/A' : formatPlaces(flightSearchParams[0])}</p>
                    <p><span className="label">Destino:</span> {flightSearchParams[0] === '' ? 'N/A' : formatPlaces(flightSearchParams[1])}</p>
                </div>
                <div className="row row2">
                    <p><span className="label">Pasajeros:</span>  {flightSearchParams[2]}</p>
                    <p><span className="label">Precio:</span> {priceParam()}</p>
                </div>
            </article>

            <h1>Vuelos {typeOfSearchTittle()} disponibles:</h1>
            {showFlights()}
            <button className='btn btn-secondary' onClick={(e) => handleSearchAgain(e)}>Buscar más vuelos</button>
        </div>
    )
}

export default AvailableDepartureFlights