import './App.css';
import { useState, useEffect } from 'react';
import SelectAirport from './components/SelectAirport';
import Results from './components/Results';

function App() {
  const [airports, setAirports] = useState({
    outbound: '0',
    return: '0',
  });
  const [results, setResults] = useState(null);

  const selectAirport = (e, type) => {
    setAirports({ ...airports, [type]: e.target.value });
  };

  useEffect(() => {
    if (airports.outbound === '0' || airports.return === '0') return;

    fetch(`/api/v1/fares/${airports.outbound}/${airports.return}`)
    .then((res) => {
      return res.text();
    })
    .then((data) => {
      setResults(data);
    });
  }, [airports]);

  return (
    <>
      <h1>WeekendFareFinder</h1>
      <label>Outbound Airport</label>
      <SelectAirport
        value={airports.outbound}
        onChange={(e) => selectAirport(e, 'outbound')} 
      />

      <label>Return Airport</label>
      <SelectAirport
        value={airports.return}
        onChange={(e) => selectAirport(e, 'return')} 
      />
      <Results airports={airports} data={results} />
    </>
  );
}

export default App;