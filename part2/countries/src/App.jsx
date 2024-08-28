import { useState, useEffect } from "react";

import CountriesService from "./services/Countries";
import CountriesDisplay from "./components/CountriesDisplay";

const Search = ({ text, onChange }) => {
  return (
    <div>
      find countries
      <input value={text} onChange={onChange} />
    </div>
  );
};

function App() {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    CountriesService.getAll().then((response) => {
      setCountries(response);
    });
  }, []);

  return (
    <>
      <Search
        text={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      <CountriesDisplay
        countries={countries}
        search={search}
        setSearch={setSearch}
      />
    </>
  );
}

export default App;
