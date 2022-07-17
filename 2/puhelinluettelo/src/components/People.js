const People = (props) => {
    return(
        <div>
            <ul>
                {props.persons.filter(person => person.name.toUpperCase().includes(props.onSearch.toUpperCase())).map(person =>
                <li key={person.id}> {person.name}: {person.number}</li>
                )}
            </ul>
      </div>
    )
}

export default People