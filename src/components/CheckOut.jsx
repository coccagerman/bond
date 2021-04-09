import { useState } from 'react';
import CheckOutForm from './CheckOutForm'

function CheckOut({setSectionShown, typeOfTripSwitch, chosenDepartureFlight, chosenReturnFlight, handleSearchAgain, formatPlaces}) {
    
    // Function that returns to AvailableDepartureFlights section when ReturnToSearchResults is pressed
    function handleReturnToDepartureSearchResults(e) {
        e.preventDefault();
        setSectionShown('AvailableDepartureFlights')
    }

    // Function that returns to AvailableReturnFlights section when ReturnToSearchResults is pressed
    function handleReturnToReturnSearchResults(e) {
        e.preventDefault();
        setSectionShown('AvailableReturnFlights')
    }

    // Hook used to disable modify flight button once checkOut form is submitted
    const [buttonDisabled, setbuttonDisabled] = useState(false)

    // Function that displays the data of the return flight selected when the trip chosen is roundTrip
    function showReturnFlight () {
        if (typeOfTripSwitch%2 === 1) {
            return (
                <article className="flight">
                    <h2>Vuelo de vuelta:</h2>
                    <div className="row row1">
                        <p><span className="label">Fecha:</span> {chosenReturnFlight[0]}</p>
                        <p><span className="label">Origen:</span> {formatPlaces(chosenReturnFlight[1])}</p>
                        <p><span className="label">Destino:</span> {formatPlaces(chosenReturnFlight[2])}</p>
                    </div>
                    <div className="row row2">
                        <p><span className="label">Pasajeros:</span>  {chosenReturnFlight[4]}</p>
                        <p><span className="label">Precio unitario:</span> $ {(chosenReturnFlight[3]).toFixed(2)}</p>
                        <p><span className="label">Precio total:</span> $ {(chosenReturnFlight[3]*chosenReturnFlight[4]).toFixed(2)}</p>
                        <button className="btn btn-secondary" disabled={buttonDisabled} onClick={(e) => handleReturnToReturnSearchResults(e)}>Modificar</button>
                    </div>
                </article>
            )
        } else {
            return null
        }
    }

    // Function that alternates the recap info depending if the trip selected is one way or round trip.
    function showRecapInfo (infoRequired) {
        if (typeOfTripSwitch%2 === 1) {

            if (infoRequired === 'unitPrice') {return (chosenDepartureFlight[3]+chosenReturnFlight[3]).toFixed(2)}
            else if (infoRequired === 'totalPrice') {return ((chosenDepartureFlight[3]+chosenReturnFlight[3])*chosenDepartureFlight[4]).toFixed(2)}
            else if (infoRequired === 'extension') {return (`${chosenDepartureFlight[0]} al ${chosenReturnFlight[0]} (${numberOfDaysBetweenDates(chosenDepartureFlight[0], chosenReturnFlight[0])} días)`)}
            
        } else if (typeOfTripSwitch%2 === 0) {

            if (infoRequired === 'unitPrice') {return chosenDepartureFlight[3]}
            else if (infoRequired === 'totalPrice') {return (chosenDepartureFlight[3]*chosenDepartureFlight[4])}
            else if (infoRequired === 'extension') {return 'N/A'}
                
        }
    }

    // Function that counts the number of days between the departure and return dates
    const numberOfDaysBetweenDates = (startDate, endDate) => {
        const start = new Date(startDate)
        const end = new Date(endDate)
        let dayCount = 0
      
        while (end >= start) {
          dayCount++
          start.setDate(start.getDate() + 1)
        }
      
        return dayCount
      }

    return (
        <section className="checkOut-section">
            <h1>Revise la información de sus vuelos y complete el formulario para confirmar su compra.</h1>

            <div className="checkOut-container">
                <div className="selectedFlights-container">
                    <article className="flight">
                        <h2>Vuelo de ida:</h2>
                        <div className="row row1">
                            <p><span className="label">Fecha:</span> {chosenDepartureFlight[0]}</p>
                            <p><span className="label">Origen:</span> {formatPlaces(chosenDepartureFlight[1])}</p>
                            <p><span className="label">Destino:</span> {formatPlaces(chosenDepartureFlight[2])}</p>
                        </div>
                        <div className="row row2">
                            <p><span className="label">Pasajeros:</span>  {chosenDepartureFlight[4]}</p>
                            <p><span className="label">Precio unitario:</span> $ {(chosenDepartureFlight[3]).toFixed(2)}</p>
                            <p><span className="label">Precio total:</span> $ {(chosenDepartureFlight[3]*chosenDepartureFlight[4]).toFixed(2)}</p>
                            <button className="btn btn-secondary" disabled={buttonDisabled} onClick={(e) => handleReturnToDepartureSearchResults(e)}>Modificar</button>
                        </div>
                    </article>

                    {showReturnFlight()}

                    <article className="flight">
                        <h2>Resumen:</h2>
                        <div className="row row1">
                            <p><span className="label">Precio unitario:</span> $ {showRecapInfo('unitPrice')}</p>
                            <p><span className="label">Precio total:</span> $ {showRecapInfo('totalPrice')}</p>
                        </div>
                        <div className="row row2">
                            <p><span className="label">Extensión:</span> {showRecapInfo('extension')}</p>
                        </div>
                    </article>
                </div>

                <CheckOutForm setbuttonDisabled={setbuttonDisabled}/>

            </div>
            <button className="btn btn-secondary" onClick={(e) => handleSearchAgain(e)}>Buscar más vuelos</button>
        </section>
    )
}

export default CheckOut