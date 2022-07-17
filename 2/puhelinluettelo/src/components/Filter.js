const Filter = (props) =>{
    return(
<div>
    Filter shown numbers by name: <input value={props.onSearch}
       onChange={props.handleSearch}/>
</div>
    )
}

export default Filter