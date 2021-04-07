function ReturnFlightOption ({data, origin, destination, price, availability, setSectionShown, setChosenReturnFlight, passengers, totalPrice, formatPlaces}) {

    // Function that executes when Select flight button is pressed
    function handleSelectFlight(e) {
        e.preventDefault();
        setChosenReturnFlight([data, origin, destination, price, passengers])
        setSectionShown('CheckOut')
        }

    return (
        <div className='flightOption-div'>
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
                <button className='btn btn-primary' onClick={(e) => handleSelectFlight(e)}>Seleccionar vuelo de vuelta</button> 
            </div>
        </article>
        </div>
    )
}

export default ReturnFlightOption