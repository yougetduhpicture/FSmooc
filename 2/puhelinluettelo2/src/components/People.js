const People = (props) => {
    if (props.persons.length > 0){
    return(
        <div>
            <ul>
                {props.persons.filter(person => person.name.toUpperCase().includes(props.onSearch.toUpperCase())).map(person =>
                <li key={person.id}>
                     {person.name}: {person.number}
                 <button onClick={() =>{props.handleClick(person.id)}} value={person.id}>Delete </button>
                </li>
                )}
            </ul>
      </div>
    )
}
}

export default People