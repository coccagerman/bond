import { useState } from 'react';
import DepartureFlightOption from './DepartureFlightOption'
import ErrorMessageNoAvailableFlights from './ErrorMessageNoAvailableFlights'

function AvailableDepartureFlights ({flightSearchParams, searchDepartureFlights, setSectionShown, setChosenDepartureFlight, chosenDepartureFlight, typeOfTripSwitch, formatPlaces, handleSearchAgain, typeOfDepartureDate, typeOfReturnDate}) {
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Código en revisión
    let today = new Date()
    let yesterday = today.setDate(today.getDate() - 2)
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Hook used to hold the results of the departure flight search done
    const [availableDepartureFlightsList, setAvailableDepartureFlightsList] = useState(searchDepartureFlights(flightSearchParams[0], flightSearchParams[1], flightSearchParams[2], flightSearchParams[3], flightSearchParams[5]));

    // Variable used to hold only the search results that are not in the past
    let checkedFlightsList = availableDepartureFlightsList.filter(item => (new Date(item.data) > yesterday))

    // Function that displays the flight search results
    const showFlights = () => {
        if (availableDepartureFlightsList.length === 0) {
            return <ErrorMessageNoAvailableFlights/>
        } else {
            return checkedFlightsList.map((item) => (
                <article>
                    <DepartureFlightOption data={item.data} origin={item.origin} destination={item.destination} price={item.price} totalPrice={item.price*flightSearchParams[2]} passengers={flightSearchParams[2]} setSectionShown={setSectionShown} setChosenDepartureFlight={setChosenDepartureFlight} chosenDepartureFlight={chosenDepartureFlight} typeOfTripSwitch={typeOfTripSwitch} flightSearchParams={flightSearchParams} formatPlaces={formatPlaces}/>
                </article>
                )
            )
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

    ////////////////////////////////////////////////////////////////////////////////////////////
    let flexibleDeparture = typeOfDepartureDate%2 === 1 ? true : false
    let flexibleReturn = typeOfReturnDate%2 === 1 ? true : false
    ////////////////////////////////////////////////////////////////////////////////////////////

    // Function used to display a different return date search parameter depending on the type of search entered in the search form
    function returnDateParam () {    
        if (typeOfTripSwitch%2 === 0){ return 'N/A' }
        else if (flexibleReturn === true){ return 'Flex' }
        else { return flightSearchParams[4]}
    }

    return (
        <div className='searchResult'>
            <article className="flight searchParameters">
            <h2>Resultados de búsqueda para:</h2>
                <div className="row row1">
                    <p><span className="label">Fecha de salida:</span> {flexibleDeparture === true ? 'Flex' : flightSearchParams[3]}</p>
                    <p><span className="label">Fecha de retorno:</span> {returnDateParam()}</p>
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