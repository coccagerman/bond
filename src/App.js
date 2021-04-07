import { useState } from 'react';
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import './App.scss';
import dataset from './dataset.json'
import InitialForm from './components/InitialForm'
import AvailableDepartureFlights from './components/AvailableDepartureFlights'
import AvailableReturnFlights from './components/AvailableReturnFlights'
import CheckOut from './components/CheckOut'

function App() {

    // Hook used to display and hide the different sections of the app
    const [sectionShown,setSectionShown] = useState('InitialForm');

    // Function used to display and hide the different sections of the app
    const showSection = () => {
      if (sectionShown === 'InitialForm') {
          return (<InitialForm dataset={dataset} setFlightSearchParams={setFlightSearchParams} setSectionShown={setSectionShown} setTypeOfTripSwitch={setTypeOfTripSwitch} typeOfTripSwitch={typeOfTripSwitch} formatPlaces={formatPlaces}/>)
      } else if (sectionShown === 'AvailableDepartureFlights') {
          return <AvailableDepartureFlights flightSearchParams={flightSearchParams} searchFlights={searchFlights} setSectionShown={setSectionShown} setChosenDepartureFlight={setChosenDepartureFlight} chosenDepartureFlight={chosenDepartureFlight}typeOfTripSwitch={typeOfTripSwitch} setTypeOfTripSwitch={setTypeOfTripSwitch} formatPlaces={formatPlaces} handleSearchAgain={handleSearchAgain}/>
      } else if (sectionShown === 'AvailableReturnFlights') {
          return <AvailableReturnFlights flightSearchParams={flightSearchParams} searchFlights={searchFlights} setSectionShown={setSectionShown} setChosenReturnFlight={setChosenReturnFlight} chosenReturnFlight={chosenReturnFlight} chosenDepartureFlight={chosenDepartureFlight} setTypeOfTripSwitch={setTypeOfTripSwitch} formatPlaces={formatPlaces} handleSearchAgain={handleSearchAgain}/>
      } else if (sectionShown === 'CheckOut') {
          return <CheckOut flightSearchParams={flightSearchParams} setSectionShown={setSectionShown} typeOfTripSwitch={typeOfTripSwitch} chosenDepartureFlight={chosenDepartureFlight} chosenReturnFlight={chosenReturnFlight} handleSearchAgain={handleSearchAgain} formatPlaces={formatPlaces}/>
      }
    }

    // Function that returns to InitialForm section when ReturnToSearchResults is pressed
    function handleSearchAgain(e) {
        e.preventDefault();
        setTypeOfTripSwitch(0)
        setSectionShown('InitialForm')
    }

    // Hook that stores the click count on the oneWay/roundTrip switch
    const [typeOfTripSwitch, setTypeOfTripSwitch] = useState(0);

    // Hook that contains flight search parameters entered in InitialForm
    const [flightSearchParams,setFlightSearchParams] = useState([]);

    // Function that filters the flights database with the search parameters entered in InitialForm
    function searchFlights (origin, destination, passengers, departureDate, price) {
        if (origin === '' && destination !== '') {
            return dataset.filter(o => (o.destination === destination && o.availability >= passengers && o.data === departureDate && o.price <= price))
        } else if (origin !== '' && destination === '') {
            return dataset.filter(o => (o.origin === origin && o.availability >= passengers && o.data === departureDate && o.price <= price))
        } else if (origin === '' && destination === '') {
            return dataset.filter(o => (o.availability >= passengers && o.data === departureDate && o.price <= price))
        } else {
            return dataset.filter(o => (o.origin === origin && o.destination === destination && o.availability >= passengers && o.data === departureDate && o.price <= price))
        }
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // // Mock search function used as a parameter to the search function alteration functions
    // function mockSearchFlights (origin, destination, passengers, departureDate, price) {
    //     return dataset.filter(o => (o.origin === origin && o.destination === destination && o.availability >= passengers && o.data === departureDate && o.price <= price))
    // }

    // // Function that alters the searchFlights function depending on the parameters entered in the initial form
    // function searchFlightsAltered () {
    //     // // correr busqueda de departure
    //     let departureFlightOptions = mockSearchFlights(flightSearchParams[0], flightSearchParams[1], flightSearchParams[2], flightSearchParams[3], 1000)
    //     // // correr busqueda de return
    //     let returnFlightOptions = mockSearchFlights(flightSearchParams[1], flightSearchParams[0], flightSearchParams[2], flightSearchParams[4], 1000)
    //     // // chequear si suma de precios de ambas opciones es menor al precio ingresado como param
    //     let departureFlight = departureFlightOptions[0]
    //     let returnFlight = returnFlightOptions[0]
    //     let result = (departureFlight.price + returnFlight.price) > flightSearchParams[5] ? 'available' : 'notAvailable'
    //     console.log(result)
    // }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Hooks that contain the parameters of the flight chosen by the user
    const [chosenDepartureFlight,setChosenDepartureFlight] = useState([]);
    const [chosenReturnFlight,setChosenReturnFlight] = useState([]);

    // Function that assigns a format to the departure and destination places
    function formatPlaces (place) {
        if (place === 'COR') {
            return 'COR - Córdoba'
        } else if (place === 'EPA') {
            return 'EPA - El Palomar'
        } else if (place === 'MDZ') {
            return 'MDZ - Mendoza'
        } else if (place === 'BRC') {
            return 'BRC - Bariloche'
        } 
    }

  return (
    <div className="App">
        <Navbar sectionShown={sectionShown} setSectionShown={setSectionShown} handleSearchAgain={handleSearchAgain}/>
        <div className="mainContainer">
            {showSection()}
        </div>
        <Footer handleSearchAgain={handleSearchAgain}/>
    </div>
  );
}

export default App;
