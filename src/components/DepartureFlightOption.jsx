function DepartureFlightOption ({data, origin, destination, price, passengers, setSectionShown, setChosenDepartureFlight, typeOfTripSwitch, totalPrice, formatPlaces}) {

    let typeOfTrip = typeOfTripSwitch%2 === 0 ? 'oneWay' : 'round'

    // Function that executes when Select flight button is pressed
    function handleSelectFlight(e) {
        e.preventDefault();
        setChosenDepartureFlight([data, origin, destination, price, passengers])

        if (typeOfTrip === 'round') {
            setSectionShown('AvailableReturnFlights')
        }
        else {
            setSectionShown('CheckOut')
        }
    }

    function selectFlightBtnContent () {
        if (typeOfTrip === 'round') {
            return <button className='btn btn-primary' onClick={(e) => handleSelectFlight(e)}>Seleccionar vuelo de ida</button> 
        } else {
            return <button className='btn btn-primary' onClick={(e) => handleSelectFlight(e)}>Seleccionar vuelo</button> 
        }
    }

    return (
        <article className="flight">
            <div className="row row1">
                <p><span className="label">Fecha:</span> {data}</p>
                <p><span className="label">Origen:</span> {formatPlaces(origin)}</p>
                <p><span className="label">Destino:</span> {formatPlaces(destination)}</p>
            </div>
            <div className="row row2">
                <p><span className="label">Pasajeros:</span>  {passengers}</p>
                <p><span className="label">Precio unitario:</span> $ {price}</p>
                <p><span className="label">Precio total:</span> $ {totalPrice.toFixed(2)}</p>
                {selectFlightBtnContent()}
            </div>
        </article>
    )
}

export default DepartureFlightOption