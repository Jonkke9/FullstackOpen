const PhoneBookForm = ({
    addPerson,
    onNameChange,
    onNumChange,
    newName,
    newNum,
  }) => {
    return (
      <form onSubmit={addPerson}>
        <h2>add a new</h2>
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

export default PhoneBookForm
