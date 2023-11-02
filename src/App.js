import './App.css';
import { useState, useEffect } from 'react';
import SelectAirport from './components/SelectAirport';

function App() {
  const [airports, setAirports] = useState({
    outbound: '',
    return: '',
  });
  const [results, setResults] = useState('');

  const selectAirport = (e, type) => {
    setAirports({ ...airports, [type]: e.target.value });
  };

  useEffect(() => {
    if (airports.outbound === '' || airports.return === '') return;

    // fetch(`/api/v1/fares/${airports.outbound}/${airports.return}`)
    // .then((res) => {
    //   return res.text();
    // })
    // .then((data) => {
    //   const formattedText = data.replace(/\\n/g, '<br>').replace(/"/g, '');
    //   setResults(formattedText);
    // });
  }, [airports]);

  return (
    <>
      <SelectAirport
        value={airports.outbound}
        onChange={(e) => selectAirport(e, 'outbound')} 
      />
      <SelectAirport
        value={airports.return}
        onChange={(e) => selectAirport(e, 'return')} 
      />
    </>
  );
}

export default App;
