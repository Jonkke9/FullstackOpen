import { useState, useEffect } from "react";
import axios from "axios";

import PhoneBookForm from "./components/PhoneBookForm";
import PersonList from "./components/PersonList";
import personsService from "./services/persons";

const Filter = ({ filter, onFilterChange }) => {
  return (
    <div>
      filter
      <input value={filter} onChange={onFilterChange} />
    </div>
  );
};

const App = () => {
  const [newName, setNewName] = useState("New name...");
  const [newNum, setNewNum] = useState("New number...");
  const [filter, setFilter] = useState("");
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    personsService.getAll().then((data) => {
      setPersons(data);
    });
  }, []);

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  const addPerson = (event) => {
    event.preventDefault();
    const personExists = persons.some((person) => person.name === newName);

    if (personExists) {
      if (
        confirm(
          `${newName} is already added to phonebook, replace the old number with a new one`
        )
      ) {
        const personToUpdate = persons.find(
          (person) => person.name === newName
        );
        personsService
          .update({ ...personToUpdate, number: newNum })
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== personToUpdate.id ? person : returnedPerson
              )
            );
            setNewName("");
            setNewNum("");
          });
      }
    } else {
      personsService
        .add({ name: newName, number: newNum })
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewName("");
          setNewNum("");
        });
    }
  };

  const handleDelete = (person) => {
    if (confirm(`Delete ${person.name}?`)) {
      personsService.remove(person.id).then((returnedPerson) => {
        setPersons(persons.filter((p) => p.id !== returnedPerson.id));
      });
    }
  };

  const onNameChange = (event) => setNewName(event.target.value);

  const onNumChange = (event) => setNewNum(event.target.value);

  const onFilterChange = (event) => setFilter(event.target.value);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} onFilterChange={onFilterChange} />

      <PhoneBookForm
        addPerson={addPerson}
        onNameChange={onNameChange}
        onNumChange={onNumChange}
        newName={newName}
        newNum={newNum}
      />
      <PersonList persons={filteredPersons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
