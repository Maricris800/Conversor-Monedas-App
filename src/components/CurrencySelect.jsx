

// Componente para el selector de moneda
export const CurrencySelect = ({ label, currency, currencies, onCurrencyChange }) => (
    <div className="w-1/2">
        <label htmlFor={`${label}Currency`} className="block text-gray-700 text-sm font-semibold mb-2">
            {label}:
        </label>
        <select
            id={`${label}Currency`}
            value={currency}
            onChange={(e) => onCurrencyChange(e.target.value)}
            className="shadow border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
        >
            {currencies.map((curr) => (
                <option key={curr} value={curr}>
                    {curr}
                </option>
            ))}
        </select>
    </div>
);