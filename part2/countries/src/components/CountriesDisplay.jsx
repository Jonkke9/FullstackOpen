const CountryDisplay = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>capital {country.capital[0]}</div>
      <div>area {country.area}</div>
      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt="Could not load the flag" />
    </div>
  );
};

const CountriesList = ({ countries, setSearch }) => {
  return (
    <ul>
      {countries.map((country) => {
        return (
          <li key={country.name.common}>
            {country.name.common}{" "}
            <button onClick={() => setSearch(country.name.common)}>show</button>
          </li>
        );
      })}
    </ul>
  );
};

const CountriesDisplay = ({ countries, search, setSearch }) => {
  const filteredCountries = countries.filter((country) => {
    return country.name.common.toLowerCase().includes(search.toLowerCase());
  });

  if (filteredCountries.length === 0) return <div>No matches found</div>;

  if (filteredCountries.length > 10)
    return <div>Too many matches, specify another filter</div>;

  if (filteredCountries.length === 1)
    return <CountryDisplay country={filteredCountries[0]} />;

  return <CountriesList countries={filteredCountries} setSearch={setSearch} />;
};

export default CountriesDisplay;
