import { useState } from 'react';
import ReturnFlightOption from './ReturnFlightOption'
import ErrorMessageNoAvailableFlights from './ErrorMessageNoAvailableFlights'

function AvailableReturnFlights ({flightSearchParams, setSectionShown, setChosenReturnFlight, chosenReturnFlight, chosenDepartureFlight, formatPlaces, handleSearchAgain, searchReturnFlights, typeOfDepartureDate, typeOfReturnDate,typeOfTripSwitch}) {

    // Hook used to store the results of the return flight search done
    const [availableReturnFlightsList, setAvailableReturnFlightsList] = useState(searchReturnFlights(chosenDepartureFlight[2], chosenDepartureFlight[1], chosenDepartureFlight[4], flightSearchParams[4], flightSearchParams[5]));

    // Variable used to hold only the search results that are after the date of the departure flight
    let checkedFlightsList = availableReturnFlightsList.filter(item => (new Date(item.data) >= new Date(chosenDepartureFlight[0])))
    
    // Function that displays the flight search results
    const showFlights = () => {

        if (availableReturnFlightsList.length === 0) {
            return <ErrorMessageNoAvailableFlights/>
        } else {
            return checkedFlightsList.map((item) => (
                <article className='flightOption'>
                    <ReturnFlightOption data={item.data} origin={item.origin} destination={item.destination} price={item.price} totalPrice={item.price*flightSearchParams[2]} passengers={flightSearchParams[2]} setSectionShown={setSectionShown} setChosenReturnFlight={setChosenReturnFlight} chosenReturnFlight={chosenReturnFlight} formatPlaces={formatPlaces}/>
                </article>
              ))
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////
    // Estas funciones se deben mover a componente superior y pasarlas como param

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

    // Function that returns to AvailableDepartureFlights section when ReturnToSearchResults is pressed
    function handleReturnToDepartureSearchResults(e) {
        e.preventDefault();
        setSectionShown('AvailableDepartureFlights')
    }

    return (
        // flight searchParameters debiese ser un componente aparte 
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


            <h2>Vuelo de ida seleccionado:</h2>
            <article className="flight flightSelected">
                <div className="row row1">
                    <p><span className="label">Fecha:</span> {chosenDepartureFlight[0]}</p>
                    <p><span className="label">Origen:</span> {formatPlaces(chosenDepartureFlight[1])}</p>
                    <p><span className="label">Destino:</span> {formatPlaces(chosenDepartureFlight[2])}</p>
                </div>
                <div className="row row2">
                    <p><span className="label">Pasajeros:</span>  {chosenDepartureFlight[4]}</p>
                    <p><span className="label">Precio unitario:</span> $ {chosenDepartureFlight[3]}</p>
                    <p><span className="label">Precio total:</span> $ {(chosenDepartureFlight[4]*chosenDepartureFlight[3]).toFixed(2)}</p>
                    <button className="btn btn-secondary" onClick={(e) => handleReturnToDepartureSearchResults(e)}>Modificar</button>
                </div>
            </article>

            <h1>Vuelos de vuelta disponibles:</h1>
            {showFlights()}
            <button className='btn btn-secondary' onClick={(e) => handleSearchAgain(e)}>Buscar más vuelos</button>
        </div>
    )
}

export default AvailableReturnFlights