function SelectAirport(props) {
  return (
    <>
        <select value={props.value} onChange={props.onChange}>
          <option value="0" defaultValue hidden>Choose here</option>
          <option>Auckland</option>
          <option>Blenheim</option>
          <option>Christchurch</option>
          <option>Dunedin</option>
          <option>Gisborne</option>
          <option>Hamilton</option>
          <option>Hastings</option>
          <option>Hokitika</option>
          <option>Invercargill</option>
          <option>Kerikeri</option>
          <option>Napier</option>
          <option>Nelson</option>
          <option>New Plymouth</option>
          <option>Palmerston North</option>
          <option>Queenstown</option>
          <option>Rotorua</option>
          <option>Taupo</option>
          <option>Tauranga</option>
          <option>Timaru</option>
          <option>Wellington</option>
          <option>Whangarei</option>
        </select>
    </>
  );
}

export default SelectAirport;