import { useState } from "react";

const PhoneBookForm = ({
  addPerson,
  onNameChange,
  onNumChange,
  newName,
  newNum,
}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={onNameChange} />
      </div>
      <div>
        number: <input value={newNum} onChange={onNumChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const NumberList = ({ persons }) => {
  return (
    <div>
      <ul>
        {persons.map((person) => (
          <li key={person.name}>
            {person.name} {person.number}
          </li>
        ))}
      </ul>
    </div>
  );
};

const App = () => {
  const [newName, setNewName] = useState("New name...");
  const [newNum, setNewNum] = useState("New number...");
  const [filter, setFilter] = useState("");
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  const addPerson = (event) => {
    event.preventDefault();
    const personExists = persons.some((person) => person.name === newName);

    if (personExists) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat({ name: newName, number: newNum }));
      setNewName("");
      setNewNum("");
    }
  };

  const onNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const onNumChange = (event) => {
    console.log(event.target.value);
    setNewNum(event.target.value);
  };

  const onFilterChange = (event) => {
    console.log(event.target.value);
    setFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      filter <input value={filter} onChange={onFilterChange}/>
      <h2>add a new</h2>
      
      <PhoneBookForm
        addPerson={addPerson}
        onNameChange={onNameChange}
        onNumChange={onNumChange}
        newName={newName}
        newNum={newNum}
      />
      <h2>Numbers</h2>
      <NumberList persons={filteredPersons} />
    </div>
  );
};

export default App;
