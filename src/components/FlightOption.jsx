function FlightOption ({data, origin, destination, price, availability, setSectionShown, setChosenDepartureFlight, typeOfTripSwitch}) {

    // Function that executes when Select flight button is pressed
    function handleSelectFlight(e) {
        e.preventDefault();
        setChosenDepartureFlight([data, origin, destination, price, availability])

        if (typeOfTripSwitch%2 === 1) {
            setSectionShown('AvailableReturnFlights')
        }
        else {
            setSectionShown('CheckOut')
        }
    }

    function selectFlightBtnContent () {
        if (typeOfTripSwitch%2 === 1) {
            return <button className='btn btn-primary' onClick={(e) => handleSelectFlight(e)}>Seleccionar vuelo de ida</button> 
        } else {
            return <button className='btn btn-primary' onClick={(e) => handleSelectFlight(e)}>Seleccionar vuelo</button> 
        }
    }

    return (
        <article className="flight">
            <div className="row row1">
                <p><span className="label">Fecha:</span> {data}</p>
                <p><span className="label">Origen:</span> {origin}</p>
                <p><span className="label">Destino:</span> {destination}</p>
            </div>
            <div className="row row2">
                <p><span className="label">Availability:</span>  {availability}</p>
                <p><span className="label">Precio:</span> $ {price}</p>
                {selectFlightBtnContent()}
            </div>
        </article>
    )
}

export default FlightOption