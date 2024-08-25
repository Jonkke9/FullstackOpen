import { useState, useEffect } from "react";
import axios from "axios";

import PhoneBookForm from "./components/PhoneBookForm";
import PersonList from "./components/PersonList";
import personsService from "./services/persons";
import Filter from "./components/FilterForm"

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
        )
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
      personsService
        .remove(person.id)
        .then((returnedPerson) => {
          setPersons(persons.filter((p) => p.id !== returnedPerson.id));
        })
        .catch(() => {
          alert(`${person.name} has already been deleted from the server`);
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} onFilterChange={(event) => setFilter(event.target.value)} />
      <PhoneBookForm
        addPerson={addPerson}
        onNameChange={(event) => setNewName(event.target.value)}
        onNumChange={(event) => setNewNum(event.target.value)}
        newName={newName}
        newNum={newNum}
      />
      <PersonList persons={filteredPersons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
