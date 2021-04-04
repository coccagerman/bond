import dataset from '../dataset.json'
import { useState } from 'react';
import InitialForm from './InitialForm'
import AvailableDepartureFlights from './AvailableDepartureFlights'
import AvailableReturnFlights from './AvailableReturnFlights'
import CheckOut from './CheckOut'

function MainContainer() {

    // Hook used to display and hide the different sections of the app
    const [sectionShown,setSectionShown] = useState('InitialForm');

    // Function used to display and hide the different sections of the app
    const showSection = () => {
        if (sectionShown === 'InitialForm') {
            return (
            <InitialForm dataset={dataset} setFlightSearchParams={setFlightSearchParams} setSectionShown={setSectionShown} setTypeOfTripSwitch={setTypeOfTripSwitch} typeOfTripSwitch={typeOfTripSwitch} />
            )
        } else if (sectionShown === 'AvailableDepartureFlights') {
            return <AvailableDepartureFlights flightSearchParams={flightSearchParams} searchFlights={searchFlights} setSectionShown={setSectionShown} setChosenDepartureFlight={setChosenDepartureFlight} chosenDepartureFlight={chosenDepartureFlight}typeOfTripSwitch={typeOfTripSwitch} setTypeOfTripSwitch={setTypeOfTripSwitch} />
        } else if (sectionShown === 'AvailableReturnFlights') {
            return <AvailableReturnFlights flightSearchParams={flightSearchParams} searchFlights={searchFlights} setSectionShown={setSectionShown} setChosenReturnFlight={setChosenReturnFlight} chosenReturnFlight={chosenReturnFlight} chosenDepartureFlight={chosenDepartureFlight} setTypeOfTripSwitch={setTypeOfTripSwitch} />
        } else if (sectionShown === 'CheckOut') {
            return <CheckOut flightSearchParams={flightSearchParams} setSectionShown={setSectionShown} typeOfTripSwitch={typeOfTripSwitch} chosenDepartureFlight={chosenDepartureFlight} chosenReturnFlight={chosenReturnFlight} />
        }
    }

    // Hook that stores the click count on the oneWay/roundTrip switch
    const [typeOfTripSwitch, setTypeOfTripSwitch] = useState(0);

    // Hook that contains flight search parameters entered in InitialForm
    const [flightSearchParams,setFlightSearchParams] = useState([]);

    // Function that filters the flights database with the search parameters entered in InitialForm
    function searchFlights (origin, destination, passengers, departureDate) {
        return dataset.filter(o => (o.origin === origin && o.destination === destination && o.availability >= passengers && o.data === departureDate))
    }

    // Hooks that contain the parameters of the flight chosen by the user
    const [chosenDepartureFlight,setChosenDepartureFlight] = useState([]);
    const [chosenReturnFlight,setChosenReturnFlight] = useState([]);


    return (
        <div>
            {showSection()}
        </div>
    )
}

export default MainContainer