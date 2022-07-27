const Input = (props) => {
return(
    <div>
        Find countries: <input
                        value={props.value}
                        onChange={props.handleSearch}
                        />
    </div>
)
}

export default Input