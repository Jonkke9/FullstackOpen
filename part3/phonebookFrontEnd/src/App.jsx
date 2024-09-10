import { useState, useEffect } from "react";

import PhoneBookForm from "./components/PhoneBookForm";
import PersonList from "./components/PersonList";
import personsService from "./services/persons";
import Filter from "./components/FilterForm";

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="notification">{message}</div>;
};

const Error = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="error">{message}</div>;
};

const App = () => {
  const [newName, setNewName] = useState("New name...");
  const [newNum, setNewNum] = useState("New number...");
  const [filter, setFilter] = useState("");
  const [persons, setPersons] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [notification, setNotificationMessage] = useState(null);

  useEffect(() => {
    personsService
      .getAll()
      .then((data) => {
        setPersons(data);
      })
      .catch((error) => {
        setPersons([]);
      });
  }, []);

  const sendNotification = (message) => {
    setNotificationMessage(message);
    setTimeout(() => setNotificationMessage(null), 3000);
  };

  const sendError = (message) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(null), 3000);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  const addPerson = (event) => {
    event.preventDefault();

    if (persons.some((person) => person.name === newName)) {
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
            sendNotification(
              `Changed the number of ${returnedPerson.name} to ${returnedPerson.number}`
            );
            setNewName("");
            setNewNum("");
          })
          .catch((error) => {
            sendError(
              `${personToUpdate.name} has already been deleted from the server.`
            );
          });
      }
    } else {
      personsService
        .add({ name: newName, number: newNum })
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          sendNotification(`Added ${returnedPerson.name}.`);
          setNewName("");
          setNewNum("");
        })
        .catch((error) => {
          console.log(error);
          sendError(`Something went wrong when trying to add ${newName}`);
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
        .catch((error) => {
          sendError(`${person.name} has already been deleted from the server.`);
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Error message={errorMessage} />
      <Filter
        filter={filter}
        onFilterChange={(event) => setFilter(event.target.value)}
      />
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
