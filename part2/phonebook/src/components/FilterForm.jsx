const Filter = ({ filter, onFilterChange }) => {
    return (
      <div>
        filter
        <input value={filter} onChange={onFilterChange} />
      </div>
    )
}

export default filter