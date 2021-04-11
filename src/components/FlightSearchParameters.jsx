import {useSpring, animated} from 'react-spring'

function FlightSearchParameters ({typeOfDepartureDate, typeOfReturnDate, flightSearchParams, typeOfTripSwitch, formatPlaces}) {

    let typeOfTrip = typeOfTripSwitch%2 === 0 ? 'oneWay' : 'round'
    let flexibleDeparture = typeOfDepartureDate%2 === 1 ? true : false
    let flexibleReturn = typeOfReturnDate%2 === 1 ? true : false

    // Function used to display a different price search parameter depending on the param entered in the search form
    function priceParam () {
        if (flightSearchParams[5] === 1000 || flightSearchParams[5] === '1000') { return 'Hasta $1000 por persona' }
        else if (flightSearchParams[5] === '800') { return 'Hasta $800 por persona' }
        else if (flightSearchParams[5] === '600') { return 'Hasta $600 por persona' }
        else if (flightSearchParams[5] === '400') { return 'Hasta $400 por persona' }
        else { return 'Hasta $200 por persona' }
    }

    // Function used to display a different return date search parameter depending on the type of search entered in the search form
    function returnDateParam () {    
        if (typeOfTrip === 'oneWay') { return 'N/A' }
        else if (flexibleReturn === true) { return 'Flex' }
        else { return flightSearchParams[4]}
    }

    // Animation props
    const searchParamsAnimationProps = useSpring({opacity: 1, marginTop:0, from: {opacity: 0, marginTop:-100, }, delay: 200})

    return (
        <animated.article style={searchParamsAnimationProps} className="flight searchParameters">
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
        </animated.article>

    )
}

export default FlightSearchParameters