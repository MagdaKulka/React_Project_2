import React, { useState, useEffect } from 'react';
import './style.css';

const App = () => {
	const [currencies, setCurrencies] = useState([]);
	const [selectedCurrency, setSelectedCurrency] = useState('');
	const [inputValue, setInputValue] = useState('');
	const [result, setResult] = useState('');

	useEffect(() => {
		fetchCurrencies();
	}, []);

	const fetchCurrencies = () => {
		fetch('https://api.nbp.pl/api/exchangerates/tables/a/')
			.then((response) => response.json())
			.then((data) => {
				const rates = data[0].rates;
				setCurrencies(rates);
			})
			.catch((error) => {
				console.log('Error fetching currencies:', error);
			});
	};

	const handleCurrencyChange = (event) => {
		setSelectedCurrency(event.target.value);
	};

	const handleInputChange = (event) => {
		setInputValue(event.target.value);
	};

	const handleConvert = () => {
		if (inputValue === '' || inputValue < 0) {
			window.alert('Podaj poprawną wartość');
		} else {
			setResult(inputValue * selectedCurrency);
		}
	};

	return (
		<div className='container'>
			<h1>PRZELICZNIK WALUT</h1>
			<div className='box'>
				<div className='left-box'>
					<div>
						<label htmlFor='input'>PODAJ KWOTĘ</label>
						<input type='number' name='' id='input' value={inputValue} onChange={handleInputChange} />
					</div>
					<select name='currency' className='currency' value={selectedCurrency} onChange={handleCurrencyChange}>
						{currencies.map((currency) => (
							<option key={currency.currency} value={currency.mid}>
								{currency.currency}
							</option>
						))}
					</select>
				</div>
				<button className='btn' onClick={handleConvert}>
					PRZELICZ
				</button>
				<h2 className='result'>{result}</h2>
			</div>
		</div>
	);
};

export default App;
