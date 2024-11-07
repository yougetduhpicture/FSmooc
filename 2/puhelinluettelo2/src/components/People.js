const People = (props) => {
  if (props.people.length > 0) {
    console.log(props.people);
    return (
      <div>
        <ul>
          {props.people

            .filter((person) =>
              person.name.toUpperCase().includes(props.onSearch.toUpperCase())
            )
            .map((person) => (
              <li key={person.id}>
                {person.name}: {person.number}
                <button
                  onClick={() => {
                    props.handleClick(person.id);
                  }}
                  value={person.id}
                >
                  Delete{" "}
                </button>
              </li>
            ))}
        </ul>
      </div>
    );
  }
};

export default People;
