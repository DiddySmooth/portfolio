const Header = (props) => {
    return (
        <div>
            <h1 className="headerName">{props.name}</h1>
            <h3>{props.title}</h3>
        </div>
    )
}
export default Header