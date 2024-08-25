
const DeleteButton = ({handleDelete}) => {
    return (
        <button onClick={handleDelete}>delete</button>
    )
}

const Person = ({ person, handleDelete }) => {
  return (
    <li>
      {person.name} {person.number}
      <DeleteButton handleDelete={()=> handleDelete(person)}/>
    </li>
  )
}

const PersonList = ({ persons, handleDelete}) => {
  return (
    <div>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <Person key={person.name} person={person} handleDelete={handleDelete}/>
        ))}
      </ul>
    </div>
  )
}

export default PersonList
