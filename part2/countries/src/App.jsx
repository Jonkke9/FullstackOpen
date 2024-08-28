import { useState, useEffect } from "react";

import CountriesService from "./services/Countries";

const Search = ({ text, onChange }) => {
  return (
    <div>
      find countries
      <input value={text} onChange={onChange} />
    </div>
  );
};

const CountryList = ({ countries, search }) => {
  const filteredCountries = countries.filter((country) => {
    return country.name.common.toLowerCase().includes(search.toLowerCase());
  });

  if (filteredCountries.length === 0) return <div>No matches found</div>;

  if (filteredCountries.length > 10)
    return <div>Too many matches, specify another filter</div>;

  if (filteredCountries.length === 1) {
    const country = filteredCountries[0];
    return (
      <div>
        <h2>{country.name.common}</h2>
        <div>capital {country.capital[0]}</div>
        <div>area {country.area}</div>
        <h3>languages:</h3>
        <ul>
          {Object.values(country.languages).map((language ) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt="Could not load the flag" />
      </div>
    );
  }

  return (
    <ul>
      {filteredCountries.map((country) => {
        return <li key={country.name.common}>{country.name.common}</li>;
      })}
    </ul>
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
      <CountryList countries={countries} search={search} />
    </>
  );
}

export default App;
