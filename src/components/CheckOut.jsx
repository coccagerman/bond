import { useState } from 'react';
import CheckOutForm from './CheckOutForm'

function CheckOut({setSectionShown, typeOfTripSwitch, chosenDepartureFlight, chosenReturnFlight}) {
    
    // Function that returns to AvailableFlights section when ReturnToSearchResults is pressed
    function handleReturnToSearchResults(e) {
        e.preventDefault();
        setSectionShown('AvailableFlights')
    }

    // Function that returns to InitialForm section when ReturnToSearchResults is pressed
    function handleSearchAgain(e) {
        e.preventDefault();
        setSectionShown('InitialForm')
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
                        <p><span className="label">Origen:</span> {chosenReturnFlight[1]}</p>
                        <p><span className="label">Destino:</span> {chosenReturnFlight[2]}</p>
                    </div>
                    <div className="row row2">
                        <p><span className="label">Availability:</span>  {chosenReturnFlight[4]}</p>
                        <p><span className="label">Precio:</span> $ {chosenReturnFlight[3]}</p>
                        <button className="btn btn-secondary" disabled={buttonDisabled} onClick={(e) => handleReturnToSearchResults(e)}>Modificar</button>
                    </div>
                </article>
            )
        } else {
            return null
        }
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
                            <p><span className="label">Origen:</span> {chosenDepartureFlight[1]}</p>
                            <p><span className="label">Destino:</span> {chosenDepartureFlight[2]}</p>
                        </div>
                        <div className="row row2">
                            <p><span className="label">Availability:</span>  {chosenDepartureFlight[4]}</p>
                            <p><span className="label">Precio:</span> $ {chosenDepartureFlight[3]}</p>
                            <button className="btn btn-secondary" disabled={buttonDisabled} onClick={(e) => handleReturnToSearchResults(e)}>Modificar</button>
                        </div>
                    </article>

                    {showReturnFlight()}
                </div>

                <CheckOutForm setbuttonDisabled={setbuttonDisabled}/>

            </div>
            <button className="btn btn-secondary" onClick={(e) => handleSearchAgain(e)}>Buscar más vuelos</button>
        </section>
    )
}

export default CheckOut