const Button = (props) => {
    return(
        <div>
            <button onClick={() => props.handleClick(props.name)} value={props.name}>{props.text}</button>
        </div>
        )
}
export default Button