import { useState } from 'react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function InitialForm ({dataset, setFlightSearchParams, setSectionShown, setTypeOfTripSwitch, typeOfTripSwitch}) {

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
    const [desiredPassengers, setDesiredPassengers] = useState('');
    const [desiredDepartureDate, setDesiredDepartureDate] = useState(new Date());
    const [desiredReturnDate, setDesiredReturnDate] = useState(new Date())

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

    // Function that takes actions when submit button is clicked
    function handleSubmit (e) {
        e.preventDefault()

        if (desiredOrigin === '' || desiredDestination === '' || desiredPassengers === '') {
            return setErrorMessage('Por favor complete todos los campos del formulario.')
        }
        else {
            setFlightSearchParams([desiredOrigin, desiredDestination, desiredPassengers, formatDate(desiredDepartureDate), formatDate(desiredReturnDate)])
            setSectionShown('AvailableDepartureFlights')
        }
    }

    return (
        <form action="" method="get" className="initialForm">

            <div className="inputs-div inputs-div-row1">
                <article className="formInput">
                    <label for="origin">Origen</label>
                    <select id="origin" className="selectBox" onChange={e => setDesiredOrigin(e.target.value)}>
                    
                        <option value=""></option>
                        {distinctOrigins.map(origin => (
                            <option key={origin} value={origin}>{origin}</option>
                        ))}

                    </select>
                </article>

                <article className="formInput">
                    <label for="destination">Destino</label>
                    <select id="destination" className="selectBox" onChange={e => setDesiredDestination(e.target.value)}>

                        <option value=""></option>
                        {distinctDestinations.map(destination => (
                            <option key={destination} value={destination}>{destination}</option>
                        ))}

                    </select>
                </article>

                <article className="formInput">
                    <label for="passengers">Pasajeros</label>
                    <select id="passengers" className="selectBox" onChange={e => setDesiredPassengers(e.target.value)}>
                        <option value=""></option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
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
                    <label for="desiredReturnDate">Fecha de retorno</label>
                    <DatePicker id="desiredReturnDate" className="selectBox" dateFormat="yyyy-MM-dd" selected={desiredReturnDate} onChange={date => setDesiredReturnDate(date)} />

                    <div className="switch-container small-switch-container" >
                        <p className="switchTittle"><span className={switchClass1(typeOfReturnDate)}>Búsqueda exacta</span> | <span className={switchClass2(typeOfReturnDate)}>Búsqueda flexible</span></p>
                        <label className="switch" >
                            <input type="checkbox" onClick={(e) => setTypeOfReturnDate(typeOfReturnDate+1)}/>
                            <span className="slider round" />
                        </label>
                    </div>
                </article>
            
        </div>

            <div className='btnAndError-div'>
                {errorMessage}
                <button className="btn btn-primary" onClick={(e) => handleSubmit(e)}>Buscar vuelos</button>
            </div>
        </form>
    )
}

export default InitialForm