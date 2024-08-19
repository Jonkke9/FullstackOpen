import { useState } from "react";

const PhoneBookForm = ({addPerson, onChange, newName}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: 
        <input
          value={newName}
          onChange={onChange}
        />
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
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <li key={person.name}>{person.name}</li>
        ))}
      </ul>
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("New name...");

  const addPerson = (event) => {
    event.preventDefault()
    const personExists = persons.some(person => person.name === newName);

    if (personExists) {
      console.log("Person by the name" + newName + "already exists in the phonebook.");
    } else {
      setPersons(persons.concat({ name: newName}));
      setNewName("");
    }
  }

  const onChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <PhoneBookForm addPerson={addPerson} newName={newName} onChange={onChange}/>
      <NumberList persons={persons}/>
    </div>
  );
};

export default App;
