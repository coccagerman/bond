import { useState } from 'react';
import {useSpring, animated} from 'react-spring'
import FlightSearchParameters from './FlightSearchParameters'
import DepartureFlightOption from './DepartureFlightOption'
import ErrorMessageNoAvailableFlights from './ErrorMessageNoAvailableFlights'

function AvailableDepartureFlights ({flightSearchParams, searchDepartureFlights, setSectionShown, setChosenDepartureFlight, chosenDepartureFlight, typeOfTripSwitch, formatPlaces, handleSearchAgain, typeOfDepartureDate, typeOfReturnDate, searchReturnFlights, setPreloadNextSection}) {

    let typeOfTrip = typeOfTripSwitch%2 === 0 ? 'oneWay' : 'round'
    let desiredTotalPrice = flightSearchParams[5]
    
    // Hook used to hold the results of the departure flight search done
    const [availableDepartureFlightsList, setAvailableDepartureFlightsList] = useState(searchDepartureFlights(
        flightSearchParams[0], flightSearchParams[1], flightSearchParams[2], flightSearchParams[3], flightSearchParams[5])
        );

    // Variables used to hold only the search results that are not in the past and are beneath the max price selected
    let today = new Date()
    let yesterday = today.setDate(today.getDate() - 1)
    let checkedFlightsList = availableDepartureFlightsList.filter(item => (new Date(item.data) > yesterday && item.price <= desiredTotalPrice))

        if (typeOfTrip === 'round') {
        let possibleReturnFlights = searchReturnFlights(flightSearchParams[1], flightSearchParams[0], flightSearchParams[2], flightSearchParams[4], flightSearchParams[5])
        let minDeparturePrice = Math.min.apply(Math, checkedFlightsList.map(item => item.price))
        let minReturnPrice = Math.min.apply(Math, possibleReturnFlights.map(item => item.price))

            if (minDeparturePrice + minReturnPrice > desiredTotalPrice) {
                checkedFlightsList = []
            }
    }

    // Function that displays the flight search results
    const showFlights = () => {
        if (checkedFlightsList.length === 0) {
            return <ErrorMessageNoAvailableFlights/>
        } else {
            return checkedFlightsList.map((item) => (
                <article>
                    <DepartureFlightOption data={item.data} origin={item.origin} destination={item.destination} price={item.price} totalPrice={item.price*flightSearchParams[2]} passengers={flightSearchParams[2]} setSectionShown={setSectionShown} setChosenDepartureFlight={setChosenDepartureFlight} chosenDepartureFlight={chosenDepartureFlight} typeOfTripSwitch={typeOfTripSwitch} formatPlaces={formatPlaces} setPreloadNextSection={setPreloadNextSection}/>
                </article>
                )
            )
        }
    }

    // Function used to display a different search tittle wether the trip desired is one way or round
    function typeOfSearchTittle () {
        if (typeOfTrip === 'round') { return 'de ida' }
        else { return null }
    }

    // Animation props
    const searchTittleAnimationProps = useSpring({opacity: 1, from: {opacity: 0}, delay: 0})

    return (
            <div className='searchResult' key='searchResult'>


                <FlightSearchParameters flightSearchParams={flightSearchParams} typeOfDepartureDate={typeOfDepartureDate} typeOfReturnDate={typeOfReturnDate} typeOfTripSwitch={typeOfTripSwitch} formatPlaces={formatPlaces}/>

                <animated.h1 style={searchTittleAnimationProps}>Vuelos {typeOfSearchTittle()} disponibles:</animated.h1>
                {showFlights()}
                <button className='btn btn-secondary' onClick={(e) => handleSearchAgain(e)}>Buscar más vuelos</button>

            </div>
    )
}

export default AvailableDepartureFlights