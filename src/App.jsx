import React, {useState} from 'react';
import {Button, IconButton, Input, Spinner} from "@material-tailwind/react";
import apiService from "./PerferctNumberService.service";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faXmark} from '@fortawesome/free-solid-svg-icons';

function App() {
    const [numberOne, setNumberOne] = useState('');
    const [numberTwo, setNumberTwo] = useState('');
    const [alert, setAlert] = useState(false);
    const [perfectNumbers, setPerfectNumbers] = useState([]);
    const [isApiCallCompleted, setIsApiCallCompleted] = useState(false);
    const [isNumberOnePerfect, setIsNumberOnePerfect] = useState(false);
    const [isNumberTwoPerfect, setIsNumberTwoPerfect] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const setInitialValues = () => {
        setPerfectNumbers([]);
        setIsApiCallCompleted(false);
    }

    const clearFields = () => {
        setNumberOne('');
        setNumberTwo('');
        setAlert(false);
        setInitialValues();
    }

    const handleNumberChanges = (number, value) => {
        setInitialValues();
        number === 1 ? setNumberOne(value) : setNumberTwo(value);
    }

    const handleClick = async () => {
        setInitialValues();

        if (!numberOne || !numberTwo) {
            setAlert(true);
            return;
        }

        try {
            setIsLoading(true);
            setAlert(false)

            const isNumberOnePerfect = await apiService.isPerfect(numberOne);
            const isNumberTwoPerfect = await apiService.isPerfect(numberTwo);
            const perfectNumbersResponse = await apiService.getPerfectNumbers(numberOne, numberTwo);

            setPerfectNumbers(perfectNumbersResponse);
            setIsNumberOnePerfect(isNumberOnePerfect);
            setIsNumberTwoPerfect(isNumberTwoPerfect);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
            setIsApiCallCompleted(true);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-lime-100">
            {isLoading
                ?
                <div id="spinner" className="p-5">
                    <Spinner className="h-12 w-12" color="blue"/>
                </div>
                :
                <div className="p-6 rounded shadow-md bg-white">
                    <p className="text-3xl font-bold">Perfect Numbers</p>

                    <div className="pb-5">
                        <p> Input two random numbers to check if either or both of them are perfect numbers.</p>
                        <p> We'll also check the numbers between them and print any perfect numbers we find.</p>
                    </div>

                    <div className="flex flex-row items-center justify-center pb-5">
                        <Input
                            type="number"
                            color="light-blue"
                            size="md"
                            label="Number 1"
                            value={numberOne}
                            required={true}
                            onChange={e => handleNumberChanges(1, e.target.value)}
                        />
                        &nbsp;&nbsp;
                        <Input
                            type="number"
                            color="light-blue"
                            size="md"
                            label="Number 2"
                            value={numberTwo}
                            required={true}
                            onChange={e => handleNumberChanges(2, e.target.value)}
                        />
                    </div>
                    {alert &&
                        <p className="pb-5">Please enter values in the number fields.</p>
                    }
                    <Button
                        color="blue"
                        size="md"
                        className="mr-5 capitalize"
                        onClick={handleClick}
                    >
                        Get Perfect Numbers
                    </Button>
                        <IconButton
                            id="clearButton"
                            variant="text"
                            size="sm"
                            onClick={clearFields}>
                            <FontAwesomeIcon icon={faXmark} />
                        </IconButton>

                    {isApiCallCompleted && (
                        <div className="pt-5">
                            <p><b>Number one ({numberOne}) </b>
                                {isNumberOnePerfect ? 'is' : 'is not'} a perfect number </p>
                            <p><b>Number two ({numberTwo}) </b>
                                {isNumberTwoPerfect ? 'is' : 'is not'} a perfect number </p>
                        </div>
                    )}
                    {perfectNumbers.length > 0 && (
                        <div className="pt-5">
                            <p>Perfect numbers:</p>
                            {perfectNumbers.map((number, index) => (
                                <span key={index}>
                                {number}{index !== perfectNumbers.length - 1 && ', '}
                            </span>
                            ))}
                        </div>
                    )}
                    {isApiCallCompleted && perfectNumbers.length === 0 && (
                        <p className="pt-5">No perfect numbers found in the given range.</p>
                    )}
                </div>

            }
        </div>

    );
}

export default App;
