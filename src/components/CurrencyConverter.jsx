import React from 'react'
import { useState, useEffect, useCallback } from 'react';
import { CurrencyInput } from './CurrencyInput';
import { CurrencySelect } from './CurrencySelect';


// Componente principal del convertidor de moneda
export const CurrencyConverter = ({ API_KEY }) => {
    // State variables
    const [amount, setAmount] = useState(1);
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('EUR');
    const [convertedAmount, setConvertedAmount] = useState(null);
    const [currencies, setCurrencies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const BASE_URL = import.meta.env.VITE_API_URL;

    // Function to fetch currencies
    const fetchCurrencies = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${BASE_URL}/currencies?apikey=${API_KEY}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            if (data.data) {
                const currencyCodes = Object.keys(data.data);
                setCurrencies(currencyCodes.sort());
            } else {
                setError('No se encontraron datos de monedas.');
            }
        } catch (err) {
            console.error("Error fetching currencies:", err);
            setError(`Error al cargar las monedas: ${err.message}. Asegúrate de que tu clave API sea válida.`);
        } finally {
            setLoading(false);
        }
    }, [API_KEY]); // Dependency on API_KEY

    // Function to fetch latest exchange rates and perform conversion
    const convertCurrency = useCallback(async () => {
        if (!amount || amount <= 0) {
            setError('Por favor, introduce una cantidad válida.');
            setConvertedAmount(null);
            return;
        }
        if (fromCurrency === toCurrency) {
            setConvertedAmount(amount);
            setError(null);
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${BASE_URL}/latest?apikey=${API_KEY}&base_currency=${fromCurrency}&currencies=${toCurrency}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            if (data.data && data.data[toCurrency]) {
                const rate = data.data[toCurrency];
                setConvertedAmount((amount * rate).toFixed(2));
            } else {
                setError('No se pudo obtener la tasa de cambio para las monedas seleccionadas.');
                setConvertedAmount(null);
            }
        } catch (err) {
            console.error("Error converting currency:", err);
            setError(`Error al convertir: ${err.message}. Verifica tu clave API y las monedas.`);
            setConvertedAmount(null);
        } finally {
            setLoading(false);
        }
    }, [amount, fromCurrency, toCurrency, API_KEY]); // Dependencies for conversion

    // Fetch currencies on component mount
    useEffect(() => {
        fetchCurrencies();
    }, [fetchCurrencies]); // Dependency on fetchCurrencies

    // Handle conversion when amount, fromCurrency, or toCurrency changes
    useEffect(() => {
        if (amount > 0 && fromCurrency && toCurrency && API_KEY !== 'YOUR_API_KEY_HERE') {
            convertCurrency();
        }
    }, [amount, fromCurrency, toCurrency, convertCurrency, API_KEY]); // Dependencies for live conversion

    return (
        <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
            <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
                Convertidor de Moneda
            </h1>

            {API_KEY === 'YOUR_API_KEY_HERE' && (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 rounded-md" role="alert">
                    <p className="font-bold">¡Atención!</p>
                    <p>Por favor, reemplaza 'YOUR_API_KEY_HERE' en el código con tu clave API de FreecurrencyAPI.com para que la aplicación funcione.</p>
                </div>
            )}

            <CurrencyInput amount={amount} onAmountChange={setAmount} />

            <div className="mb-4 flex space-x-4">
                <CurrencySelect
                    label="De"
                    currency={fromCurrency}
                    currencies={currencies}
                    onCurrencyChange={setFromCurrency}
                />
                <CurrencySelect
                    label="A"
                    currency={toCurrency}
                    currencies={currencies}
                    onCurrencyChange={setToCurrency}
                />
            </div>

            {loading && (
                <div className="text-center text-blue-600 font-medium my-4">
                    Cargando...
                </div>
            )}

            {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded-md" role="alert">
                    <p className="font-bold">Error:</p>
                    <p>{error}</p>
                </div>
            )}

            {convertedAmount !== null && !loading && !error && (
                <div className="text-center mt-6 p-4 bg-blue-100 rounded-lg shadow-inner">
                    <p className="text-xl text-blue-800 font-bold">
                        {amount} {fromCurrency} = <span className="text-2xl">{convertedAmount}</span> {toCurrency}
                    </p>
                </div>
            )}
        </div>
    );
};


