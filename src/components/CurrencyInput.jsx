


// Componente para el input de la cantidad
export const CurrencyInput = ({ amount, onAmountChange }) => (
    <div className="mb-4">
        <label htmlFor="amount" className="block text-gray-700 text-sm font-semibold mb-2">
            Cantidad:
        </label>
        <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => onAmountChange(parseFloat(e.target.value))}
            className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Introduce la cantidad"
            min="0"
        />
    </div>
);