import { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function InitialForm ({dataset, setFlightSearchParams, setSectionShown, setTypeOfTripSwitch, typeOfTripSwitch, formatPlaces}) {

    // Variables with functions that identify the different possible origins and destinations for the flights.
    const distinctOrigins = [...new Set(dataset.map(x => x.origin))]
    const distinctDestinations = [...new Set(dataset.map(x => x.destination))]

    // Hooks that stores the click count on the flexible/exact search switches
    const [typeOfDepartureDate, setTypeOfDepartureDate] = useState(0);
    const [typeOfReturnDate, setTypeOfReturnDate] = useState(0);

    // Function that executes actions when the oneWay/roundTrip switch is clicked
    function switchIsDisabled () {
        if (typeOfTripSwitch%2 === 0) {
            return 'formInput-display-none' }
        else { 
            return 'formInput-display-block'
        }
    }

    // Functions that switch the className of switchTittles when the buttons are clicked
    function switchClass1 (state) {
        if  (state%2 === 1) {
            return 'gray'
        } else {
            return null
        }
    }

    function switchClass2 (state) {
        if  (state%2 === 1) {
            return null
        } else {
            return 'gray'
        }
    }

    // Hooks that store the options selected in the form
    const [desiredOrigin, setDesiredOrigin] = useState('');
    const [desiredDestination, setDesiredDestination] = useState('');
    const [desiredPassengers, setDesiredPassengers] = useState(1);
    const [desiredDepartureDate, setDesiredDepartureDate] = useState(new Date());
    const [desiredReturnDate, setDesiredReturnDate] = useState(new Date())
    const [desiredTotalPrice, setDesiredTotalPrice] = useState(1000);

    // Hook used to show error message when form fields are uncompleted
    const [errorMessage, setErrorMessage] = useState(null);

    // Function used to format departure and return dates
    function formatDate (date) {
        let d = date
        let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
        let mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
        let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);

        return `${ye}-${mo}-${da}`
    }

    // Function used to check if the departure date is in the past
    function checkDepartureDate (departureDate) {
        let depDate = new Date(departureDate).setHours(0,0,0,0)
        let today = new Date().setHours(0,0,0,0)
    
        return (depDate >= today)
    }
    
    // Function used to check if the departure date is previous to the return date
    function checkDepartureAndReturnDates (departureDate, returnDate) {
        let depDate = new Date(departureDate)
        let retDate = new Date(returnDate)
    
        return (retDate >= depDate)
    }

    // Function that takes actions when submit button is clicked
    function handleSubmit (e) {
        e.preventDefault()
        
        console.log('desiredDepartureDate ' + desiredDepartureDate)
        console.log('today ' + new Date())

        if (checkDepartureDate (desiredDepartureDate) === false) {
            setErrorMessage('La fecha de salida no puede estar en el pasado.')
        } else if (typeOfTripSwitch%2 === 1 && (checkDepartureAndReturnDates(desiredDepartureDate, desiredReturnDate) === false)) {
            setErrorMessage('La fecha de retorno no pude ser anterior a la fecha de salida.')
        } else {
        setFlightSearchParams([desiredOrigin, desiredDestination, desiredPassengers, formatDate(desiredDepartureDate), formatDate(desiredReturnDate), desiredTotalPrice])
        setSectionShown('AvailableDepartureFlights')
        }
    }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// function handleMockSearch (e) {
//     e.preventDefault()
//     setFlightSearchParams([desiredOrigin, desiredDestination, desiredPassengers, formatDate(desiredDepartureDate), formatDate(desiredReturnDate), desiredTotalPrice])
//     searchFlightsAltered()
// }
////////////////////////////////////////////////////////////////////////////////////////////

    return (
        <form action="" method="get" className="initialForm">

            <div className="inputs-div inputs-div-row1">
                <article className="formInput" data-trigger="hover" data-toggle="popover" title="Popover title" data-content="And here's some amazing content. It's very engaging. Right?">
                    <label for="desiredOrigin">Origen</label>
                    <select id="desiredOrigin" className="selectBox" onChange={e => setDesiredOrigin(e.target.value)}>
                    
                        <option value=""></option>
                        {distinctOrigins.map(origin => (
                            <option key={origin} value={origin}>{formatPlaces(origin)}</option>
                        ))}

                    </select>
                </article>

                <article className="formInput">
                    <label for="desiredDestination">Destino</label>
                    <select id="desiredDestination" className="selectBox" onChange={e => setDesiredDestination(e.target.value)}>

                        <option value=""></option>
                        {distinctDestinations.map(destination => (
                            <option key={destination} value={destination}>{formatPlaces(destination)}</option>
                        ))}

                    </select>
                </article>

                <article className="formInput">
                    <label for="desiredPassengers">Pasajeros</label>
                    <select id="desiredPassengers" className="selectBox" onChange={e => setDesiredPassengers(e.target.value)}>
                        <option value="1" selected>1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                    </select>
                </article>
                
                <article className="switch-container" >
                    <p className="switchTittle"><span className={switchClass1(typeOfTripSwitch)}>Solo ida</span> | <span className={switchClass2(typeOfTripSwitch)}>Ida y vuelta</span></p>
                    <label className="switch" >
                        <input type="checkbox" onClick={(e) => setTypeOfTripSwitch(typeOfTripSwitch+1)}/>
                        <span className="slider round" />
                    </label>
                </article>
            </div>

            <div className="inputs-div inputs-div-row2">
                <article className="formInput">
                    <label for="desiredDepartureDate">Fecha de salida</label>
                    <DatePicker id="desiredDepartureDate" className="selectBox" dateFormat="yyyy-MM-dd" selected={desiredDepartureDate} onChange={date => setDesiredDepartureDate(date)} />

                    <div className="switch-container small-switch-container" >
                        <p className="switchTittle"><span className={switchClass1(typeOfDepartureDate)}>Búsqueda exacta</span> | <span className={switchClass2(typeOfDepartureDate)}>Búsqueda flexible</span></p>
                        <label className="switch" >
                            <input type="checkbox" onClick={(e) => setTypeOfDepartureDate(typeOfDepartureDate+1)}/>
                            <span className="slider round" />
                        </label>
                    </div>
                </article>

                <article className={switchIsDisabled()}>
                    <div className="labelAndSelector-container">
                        <label for="desiredReturnDate" className="desiredReturnDate-label">Fecha de retorno</label>
                        <DatePicker id="desiredReturnDate" className="selectBox" dateFormat="yyyy-MM-dd" selected={desiredReturnDate} onChange={date => setDesiredReturnDate(date)} />
                    </div>
                    <div className="switch-container small-switch-container" >
                        <p className="switchTittle"><span className={switchClass1(typeOfReturnDate)}>Búsqueda exacta</span> | <span className={switchClass2(typeOfReturnDate)}>Búsqueda flexible</span></p>
                        <label className="switch" >
                            <input type="checkbox" onClick={(e) => setTypeOfReturnDate(typeOfReturnDate+1)}/>
                            <span className="slider round" />
                        </label>
                    </div>
                </article>

                <article className="formInput">
                    <label for="desiredTotalPrice">Precio total</label>
                    <select id="desiredTotalPrice" className="selectBox" onChange={e => setDesiredTotalPrice(e.target.value)}>
                        <option value="200">Hasta $200</option>
                        <option value="400">Hasta $400</option>
                        <option value="800">Hasta $800</option>
                        <option value="1000" selected>Hasta $1000</option>
                    </select>

                </article>

        </div>

            <div className='btnAndError-div'>
                <p>{errorMessage}</p>
                <button className="btn btn-primary" onClick={(e) => handleSubmit(e)}>Buscar vuelos</button>
                <button className="btn btn-secondary">Run mock search</button>
            </div>
        </form>
    )
}

export default InitialForm