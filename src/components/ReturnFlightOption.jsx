function ReturnFlightOption ({data, origin, destination, price, availability, setSectionShown, setChosenReturnFlight}) {

    // Function that executes when Select flight button is pressed
    function handleSelectFlight(e) {
        e.preventDefault();
        setChosenReturnFlight([data, origin, destination, price, availability])
        setSectionShown('CheckOut')
        }

    return (
        <div className='flightOption-div'>
        <article className="flight">
            <div className="row row1">
                <p><span className="label">Fecha:</span> {data}</p>
                <p><span className="label">Origen:</span> {origin}</p>
                <p><span className="label">Destino:</span> {destination}</p>
            </div>
            <div className="row row2">
                <p><span className="label">Availability:</span>  {availability}</p>
                <p><span className="label">Precio:</span> $ {price}</p>
                <button className='btn btn-primary' onClick={(e) => handleSelectFlight(e)}>Seleccionar vuelo de vuelta</button> 
            </div>
        </article>
        </div>
    )
}

export default ReturnFlightOption